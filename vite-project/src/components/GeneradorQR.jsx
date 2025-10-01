import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const GeneradorQR = () => {
    const [texto, setTexto] = useState('');

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Generador de Código QR</h1>
            <input
                type="text"
                placeholder="Introduce texto para generar QR"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                style={{ padding: '10px', width: '80%', marginBottom: '20px' }}
            />
            <div>
                {texto && <QRCode value={texto} size={256} />}
            </div>
        </div>
    );
};

export default GeneradorQR;