import React, { useState } from 'react';
import { patchData } from '../services/fetch';

const BloquearUsuario = ({ userId, onBloqueo }) => {
    const [mensaje, setMensaje] = useState('');

    const manejarBloqueo = async () => {
        const exito = await patchData('usuarios', { bloqueado: true }, userId);
        if (exito) {
            setMensaje('Usuario bloqueado con éxito.');
            onBloqueo();
        } else {
            setMensaje('Error al bloquear el usuario.');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <button
                onClick={manejarBloqueo}
                style={{ padding: '10px 20px', backgroundColor: '#e53935', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Bloquear Usuario
            </button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default BloquearUsuario;