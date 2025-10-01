import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditarUsuario from '../components/EditarUsuario';
import { patchData } from '../services/fetch';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const user = JSON.parse(usuarioGuardado);
      setUsuario(user);
      setFotoPerfil(user.foto);

      fetch(`http://localhost:3001/compras?usuarioId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setHistorial(data))
        .catch((err) => console.error("Error al cargar compras:", err));
    }
  }, []);

  const handleEventoClick = async (eventoId) => {
    try {
      localStorage.setItem("eventoId", eventoId);

      const res = await fetch(`http://localhost:3001/compras/`);
      if (!res.ok) throw new Error("Error al obtener evento");
      const evento = await res.json();
      console.log("Evento guardado:", evento);
      setHistorial(evento);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const fotoData = reader.result;
        setFotoPerfil(fotoData);
        const updatedUser = { ...usuario, foto: fotoData };
        setUsuario(updatedUser);
        localStorage.setItem("usuario", JSON.stringify(updatedUser));
        await patchData("usuarios", updatedUser, usuario.id);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #0D0D0D, #1a001a)",
        color: "white",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ color: "#FF00FF" }}>Perfil de Usuario</h1>

      <button
        onClick={() => {
          if (usuario?.rol === "admin") {
            navigate("/principaladmi");
          } else {
            navigate("/principal");
          }
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6200ea',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Volver a Principal
      </button>

      <section>
        {usuario ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <img
                src={fotoPerfil || "/vite.svg"}
                alt="Foto de perfil"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "2px solid #FF00FF",
                  marginRight: "20px"
                }}
              />
              <div style={{ textAlign: "left" }}>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Usuario:</strong> {usuario.usuario}</p>
                <p><strong>Membresía:</strong> {usuario.membresia}</p>
                <p>
                  <strong>Rol:</strong>{" "}
                  {usuario.rol === "admin" ? "Administrador" : "Usuario"}
                </p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              style={{ marginTop: "10px" }}
            />
          </>
        ) : (
          <p>No hay datos del usuario</p>
        )}
      </section>

      <EditarUsuario userId={usuario?.id} />

      <section>
        <h2>Historial de Compras</h2>
        {historial.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {historial.map((compra) => (
              <li key={compra.id}>
                <p><strong>Evento:</strong> {compra.eventoNombre}</p>
                <p><strong>Precio:</strong> ${compra.total}</p>
                <button
                  style={{ marginTop: "10px" }}
                  onClick={() => handleEventoClick(compra.id)}
                >
                  Ver detalle
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes compras registradas.</p>
        )}
      </section>
    </div>
  );
};

export default PerfilUsuario;
