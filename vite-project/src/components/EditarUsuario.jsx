import React, { useState, useEffect } from 'react';
import { getUsuarios, patchData } from '../services/fetch.js';

const EditarUsuario = ({ userId }) => {
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    useEffect(() => {
        const cargarUsuario = async () => {
            const usuarios = await getUsuarios();
            const usuarioEncontrado = usuarios.find((u) => u.id == userId);
            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
                setNombre(usuarioEncontrado.nombre);
                setCorreo(usuarioEncontrado.correo);
                setContrasena(usuarioEncontrado.contraseña);
            }
        };
        cargarUsuario();
    }, [userId]);

    const manejarActualizacion = async () => {
        const datosActualizados = { ...usuario, nombre, correo, contraseña: contrasena };
        const exito = await patchData("usuarios",datosActualizados,userId);
        if (exito) {
            alert('Usuario actualizado correctamente');
        } else {
            alert('Error al actualizar el usuario');
        }
    };

    if (!usuario) return <p>Cargando usuario...</p>;

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Editar Usuario</h1>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <button
                onClick={manejarActualizacion}
                style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Guardar Cambios
            </button>
        </div>
    );
};

export default EditarUsuario;
