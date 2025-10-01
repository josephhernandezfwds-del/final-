import React, { useState, useRef, useEffect } from 'react';
import { postData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const AgregarEvento = () => {
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [lugar, setLugar] = useState('');
    const [artistas, setArtistas] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    const fechaRef = useRef();
    const lugarRef = useRef();
    const artistasRef = useRef();
    const precioRef = useRef();
    const imagenRef = useRef();

    const manejarEnvio = async () => {
        if (titulo=="" || fecha=="" || lugar=="" || artistas=="" || precio=="" || imagen==null) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const nuevoEvento = {
            titulo,
            fecha,
            lugar,
            artistas,
            precio,
            imagen: URL.createObjectURL(imagen)
        };

        // Subir datos del evento
        const exito = await postData('eventos', nuevoEvento);

        if (exito) {
            alert('Evento agregado correctamente.');
            setTitulo('');
            setFecha(new Date().toISOString().split('T')[0]);
            setLugar('');
            setArtistas('');
            setPrecio('');
            setImagen(null);
            navigate('/principaladmi'); // Redirigir a la página principaladmi
        } else {
            alert('Error al agregar el evento.');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Agregar Evento</h1>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') fechaRef.current.focus(); }}
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                ref={fechaRef}
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                onKeyDown={(e) => { if (e.key === 'Enter') lugarRef.current.focus(); }}
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                ref={lugarRef}
                type="text"
                placeholder="Lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') artistasRef.current.focus(); }}
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                ref={artistasRef}
                type="text"
                placeholder="Artistas"
                value={artistas}
                onChange={(e) => setArtistas(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') precioRef.current.focus(); }}
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                ref={precioRef}
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') imagenRef.current.click(); }}
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <input
                ref={imagenRef}
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
                style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <button
                onClick={manejarEnvio}
                style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Agregar Evento
            </button>
        </div>
    );
};

export default AgregarEvento;
