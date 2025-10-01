import { useNavigate } from 'react-router-dom'
import { postData } from '../services/fetch'
import { useState } from 'react'
import EditarUsuario from './EditarUsuario';

const Registro = ({ userId }) => {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();

    async function registrarUsuario() {
        const nuevoUsuario = {
            nombre,
            correo,
            contraseña,
            tipoUsuario: isAdmin ? 'admin' : 'usuario', 
        }
       
        await postData("usuarios", nuevoUsuario)
        navigate("/")
    }

    if (userId) {
        return <EditarUsuario userId={userId} />;
    }

    return (
        <div>
            <h1>Registro</h1>
            <input
                type="text"
                placeholder="Nombre"
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="email"
                placeholder="Correo"
                onChange={(e) => setCorreo(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setContraseña(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    Crear como administrador
                </label>
            </div>
            <button onClick={registrarUsuario}>Registrar</button>
        </div>
    );
};

export default Registro
