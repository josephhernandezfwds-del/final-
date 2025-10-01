import React, { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    contraseña: "",
    membresia: "Básica",
    rol: "usuario",
  });
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombre,setNombre] = useState("");
  const [clave,setClave] = useState("");
  const [membresia,setMembresia] = useState("Básica");
  const [rol,setRol] = useState("usuario");
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !nombreUsuario || !clave) {
      alert("⚠️ Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre:nombre,
          usuario:nombreUsuario,
          contraseña:clave,
          membresia:membresia,
          rol:rol
        }),
      });

      if (!response.ok) throw new Error("Error al registrar usuario");

      const data = await response.json();
      console.log("Usuario registrado:", data);

      alert(
        formData.rol === "admin"
          ? "✅ Administrador registrado con éxito"
          : "✅ Usuario registrado con éxito"
      );

      
      setFormData({
        nombre: "",
        usuario: "",
        contraseña: "",
        membresia: "Básica",
        rol: "usuario",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("❌ No se pudo registrar el usuario");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#00FFFF" }}>Registrar Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            value={nombreUsuario}
            onChange={(e)=>setNombreUsuario(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={clave}
            onChange={(e)=>setClave(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Membresía:</label>
          <select
            name="membresia"
            value={membresia}
            onChange={(e)=>setMembresia(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          >
            <option value="Básica">Básica</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Rol:</label>
          <select
            name="rol"
            value={rol}
            onChange={(e)=>setRol(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#FF00FF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
