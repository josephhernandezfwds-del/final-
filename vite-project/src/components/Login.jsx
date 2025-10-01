// Componente de inicio de sesión de la aplicación.
// Permite a los usuarios ingresar con su nombre de usuario y contraseña.
// Valida las credenciales contra la base de datos y redirige según el rol (usuario o admin).
// Importa estilos CSS, hooks de React, navegación de React Router y función para obtener usuarios.
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../services/fetch.js";

// Componente funcional para el formulario de login.
function CrearRegistroP() {
    // Estados para almacenar el nombre de usuario, clave, mostrar barra de edición (no usado), y mensaje de error.
    const [nombre, setNombre] = useState('');
    const [clave, setClave] = useState('');
    const [mostrarBarraEditar, setMostrarBarraEditar] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Función asíncrona para validar el usuario contra la API.
    async function validarUsuario() {
        try {
            // Obtiene la lista de usuarios desde el servidor.
            const usuarios = await getUsuarios();

            // Busca un usuario regular que coincida con nombre, clave y rol "usuario".
            const usuarioValido = usuarios.find(
                (u) => u.usuario === nombre && u.contraseña === clave && u.rol === "usuario"
            );

            // Busca un usuario administrador.
            const usuarioValidoAdmin = usuarios.find(
                (u) => u.usuario === nombre && u.contraseña === clave && u.rol === "admin"
            );

            // Si es usuario regular, navega a la página principal y guarda en localStorage.
            if (usuarioValido) {
                navigate("/principal");
                localStorage.setItem("usuario", JSON.stringify(usuarioValido));
                localStorage.setItem("userId", usuarioValido.id);
                return;
            }

            // Si es admin, navega a la página de admin.
            if (usuarioValidoAdmin) {
                navigate("/principaladmi");
                localStorage.setItem("usuario", JSON.stringify(usuarioValidoAdmin));
                localStorage.setItem("userId", usuarioValidoAdmin.id);
                return;
            }

            // Si no coincide, muestra error.
            setError("Usuario o contraseña incorrectos.");
        } catch (error) {
            // Maneja errores de la API.
            console.error("Error al validar usuario:", error);
            setError("Hubo un problema con el servidor, intenta más tarde.");
        }
    }

    // Renderiza el formulario de login.
    return (
        <div className="inicio-de-sesion">
            <h1>Inicio de Sesión</h1>
            // Campo de entrada para el nombre de usuario.
            <input
                type="text"
                placeholder="Usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="inputRegistroPacientes"
            />
            // Campo de entrada para la contraseña.
            <input
                type="password"
                placeholder="Clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="inputRegistroPacientes"
            />
            // Botón para iniciar sesión, llama a validarUsuario.
            <button onClick={validarUsuario} className="buttonRegistroPacientes">
                Login
            </button>

            // Muestra mensaje de error si existe.
            {error && <p className="error-text">{error}</p>}

            // Barra de edición (parece no utilizada en este componente).
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

            // Botón para navegar a la página de registro.
            <button onClick={() => navigate("/registro")} className="buttonRegistroPacientes">
                Ir a crear cuenta
            </button>
        </div>
    );
}

export default CrearRegistroP;
