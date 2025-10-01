import React, { useState } from 'react';
import { postData } from '../services/fetch';

const MetodoPago = ({ onPagar,mostrar }) => {
    const [metodo, setMetodo] = useState('paypal');
    const [detalles, setDetalles] = useState({ numeroTarjeta: '', fechaExpiracion: '', cvv: '', wallet: '' });

    const manejarPago = async () => {
        if (typeof onPagar !== 'function') {
            console.error('onPagar is not a function');
            alert('Error: No se pudo procesar el pago.');
            return;
        }
        if (!metodo) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }
        const pagoEvento = {
            eventoId: localStorage.getItem("eventoId"),
            usuarioId: JSON.parse(localStorage.getItem("usuario")).id,
            cantidadEntradas: parseInt(localStorage.getItem("cantidadEntradas"), 10) || 0,
            total: parseFloat(localStorage.getItem("precioTotal")) || 0,
            eventoNombre: JSON.parse(localStorage.getItem("evento")).titulo,
        }
        await postData("compras", pagoEvento);
        onPagar({ metodo, detalles });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetalles({ ...detalles, [name]: value });
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Método de Pago</h2>
            <p>Selecciona un método de pago:</p>
            
            <div style={{ marginBottom: '20px' }}>
                <label>
                    <input
                        type="radio"
                        name="metodo"
                        value="paypal"
                        checked={metodo === 'paypal'}
                        onChange={(e) => setMetodo(e.target.value)}
                    />
                    PayPal
                </label>
                <br />
                {metodo === "paypal" && (
                <div>
                    <input type="text" />
                    {/* mas inputs */}
                    
                </div>
            )}
                <label>
                    <input
                        type="radio"
                        name="metodo"
                        value="tarjeta"
                        checked={metodo === 'tarjeta'}
                        onChange={(e) => setMetodo(e.target.value)}
                    />
                    Tarjeta de Crédito/Débito
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="metodo"
                        value="bitcoin"
                        checked={metodo === 'bitcoin'}
                        onChange={(e) => setMetodo(e.target.value)}
                    />
                    Bitcoin
                </label>
            </div>

            {metodo === 'tarjeta' && (
                <div>
                    <input
                        type="text"
                        name="numeroTarjeta"
                        placeholder="Número de Tarjeta"
                        value={detalles.numeroTarjeta}
                        onChange={handleInputChange}
                        style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                    />
                    <br />
                    <input
                        type="text"
                        name="fechaExpiracion"
                        placeholder="Fecha de Expiración (MM/AA)"
                        value={detalles.fechaExpiracion}
                        onChange={handleInputChange}
                        style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                    />
                    <br />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={detalles.cvv}
                        onChange={handleInputChange}
                        style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                    />
                </div>
            )}

            {metodo === 'bitcoin' && (
                <div>
                    <input
                        type="text"
                        name="wallet"
                        placeholder="Dirección de Wallet Bitcoin"
                        value={detalles.wallet}
                        onChange={handleInputChange}
                        style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                    />
                </div>
            )}

            <button
                onClick={()=>{
                    mostrar(true)
                    manejarPago()
                }}
                style={{ padding: '10px 20px', backgroundColor: '#0070ba', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Pagar
            </button>
        </div>
    );
};

export default MetodoPago;