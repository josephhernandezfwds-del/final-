import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../services/fetch.js";

function CrearRegistroP() {
    const [nombre, setNombre] = useState('');
    const [clave, setClave] = useState('');
    const [mostrarBarraEditar, setMostrarBarraEditar] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    async function validarUsuario() {
        try {
            const usuarios = await getUsuarios();

            const usuarioValido = usuarios.find(
                (u) => u.usuario === nombre && u.contraseña === clave && u.rol === "usuario"
            );

            const usuarioValidoAdmin = usuarios.find(
                (u) => u.usuario === nombre && u.contraseña === clave && u.rol === "admin"
            );

            if (usuarioValido) {
                navigate("/principal");
                localStorage.setItem("usuario", JSON.stringify(usuarioValido));
                localStorage.setItem("userId", usuarioValido.id);
                return;
            }

            if (usuarioValidoAdmin) {
                navigate("/principaladmi");
                localStorage.setItem("usuario", JSON.stringify(usuarioValidoAdmin));
                localStorage.setItem("userId", usuarioValidoAdmin.id);
                return;
            }

           
            setError("Usuario o contraseña incorrectos.");
        } catch (error) {
            console.error("Error al validar usuario:", error);
            setError("Hubo un problema con el servidor, intenta más tarde.");
        }
    }

    return (
        <div className="inicio-de-sesion">
            <h1>Inicio de Sesión</h1>
            <input
                type="text"
                placeholder="Usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="inputRegistroPacientes"
            />
            <input
                type="password"
                placeholder="Clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="inputRegistroPacientes"
            />
            <button onClick={validarUsuario} className="buttonRegistroPacientes">
                Login
            </button>

            {/* ✅ Mostrar error */}
            {error && <p className="error-text">{error}</p>}

            {mostrarBarraEditar && (
                <div style={{ marginTop: "20px" }}>
                    <input
                        type="text"
                        placeholder="Nuevo nombre"
                        className="inputRegistroPacientes"
                    />
                    <input
                        type="email"
                        placeholder="Nuevo correo"
                        className="inputRegistroPacientes"
                    />
                    <button className="buttonRegistroPacientes">
                        Guardar Cambios
                    </button>
                </div>
            )}

            <button onClick={() => navigate("/registro")} className="buttonRegistroPacientes">
                Ir a crear cuenta
            </button>
        </div>
    );
}

export default CrearRegistroP;
