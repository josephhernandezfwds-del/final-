import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Calendario from '../components/Calendario';
import EditarUsuario from '../components/EditarUsuario';
import BloquearUsuario from '../components/BloquearUsuario';
import { postData, deleteData, fetchData } from '../services/fetch';
import '../styles/pricipaladmi.css';
import AgregarEvento from '../components/AgregarEvento';

const PrincipalAdmi = () => {
    const [eventos, setEventos] = useState([]);
    const [nuevoEvento, setNuevoEvento] = useState({
        titulo: '',
        fecha: new Date().toISOString().split('T')[0],
        lugar: '',
        artistas: '',
        precio: '',
        imagen: ''
    });
    const navigate = useNavigate();

    const fechaRef = useRef();
    const lugarRef = useRef();
    const artistasRef = useRef();
    const precioRef = useRef();
    const imagenRef = useRef();

    const manejarCambio = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagen" && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setNuevoEvento({ ...nuevoEvento, imagen: reader.result });
            };
            reader.readAsDataURL(files[0]);
        } else {
            setNuevoEvento({ ...nuevoEvento, [name]: value });
        }
    };

    const agregarEvento = async () => {
        if (!nuevoEvento.titulo || !nuevoEvento.fecha || !nuevoEvento.lugar || !nuevoEvento.artistas || !nuevoEvento.precio) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const eventoConId = { ...nuevoEvento, id: Date.now() };
        const exito = await postData('eventos', eventoConId);
        if (exito) {
            setEventos([...eventos, eventoConId]);
            setNuevoEvento({ titulo: '', fecha: new Date().toISOString().split('T')[0], lugar: '', artistas: '', precio: '', imagen: '' });
            alert('Evento agregado correctamente.');
        } else {
            alert('Error al agregar el evento.');
        }
    };

    const eliminarEvento = async (id) => {
        const exito = await deleteData('eventos', id);
        if (exito) {
            setEventos(eventos.filter(evento => evento.id !== id));
            alert('Evento eliminado correctamente.');
        } else {
            alert('Error al eliminar el evento.');
        }
    };

    const mostrarEventos = async () => {
        const eventosObtenidos = await fetchData('eventos');
        if (eventosObtenidos) {
            setEventos(eventosObtenidos);
        } else {
            alert('Error al obtener los eventos.');
        }
    };

    const manejarBloqueo = () => {
        alert('El usuario ha sido bloqueado.');
    };

    const cerrarSesion = () => {
        localStorage.clear();
        alert("Sesión cerrada correctamente.");
        window.location.href = "/";
    };

    useEffect(() => {
        let timeout;

        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                alert("Sesión cerrada por inactividad.");
                localStorage.clear();
                window.location.href = "/";
            }, 300000);
        };

        window.addEventListener("mousemove", resetTimeout);
        window.addEventListener("keydown", resetTimeout);

        resetTimeout();

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetTimeout);
            window.removeEventListener("keydown", resetTimeout);
        };
    }, []);

    console.log(eventos);

    return (
        <div className="principaladmi-container">
            <h1>Administración de Eventos</h1>

            <button
                onClick={cerrarSesion}
                style={{ padding: '10px 20px', backgroundColor: '#e53935', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
            >
                Cerrar Sesión
            </button>

            <button
                onClick={() => navigate("/perfil")}
                style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
            >
                Ir a Perfil
            </button>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={nuevoEvento.titulo}
                    onChange={manejarCambio}
                    onKeyDown={(e) => { if (e.key === 'Enter') fechaRef.current.focus(); }}
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <br />
                <input
                    ref={fechaRef}
                    type="date"
                    name="fecha"
                    value={nuevoEvento.fecha}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={manejarCambio}
                    onKeyDown={(e) => { if (e.key === 'Enter') lugarRef.current.focus(); }}
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <br />
                <input
                    ref={lugarRef}
                    type="text"
                    name="lugar"
                    placeholder="Lugar"
                    value={nuevoEvento.lugar}
                    onChange={manejarCambio}
                    onKeyDown={(e) => { if (e.key === 'Enter') artistasRef.current.focus(); }}
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <br />
                <input
                    ref={artistasRef}
                    type="text"
                    name="artistas"
                    placeholder="Artistas"
                    value={nuevoEvento.artistas}
                    onChange={manejarCambio}
                    onKeyDown={(e) => { if (e.key === 'Enter') precioRef.current.focus(); }}
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <br />
                <input
                    ref={precioRef}
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={nuevoEvento.precio}
                    onChange={manejarCambio}
                    onKeyDown={(e) => { if (e.key === 'Enter') imagenRef.current.click(); }}
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <br />
                <input
                    ref={imagenRef}
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={manejarCambio}
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <br />
                <button
                    onClick={agregarEvento}
                    style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Agregar Evento
                </button>
            </div>

            <button
                onClick={mostrarEventos}
                style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
            >
                Mostrar Eventos de Principal
            </button>

            <div style={{ marginTop: '20px' }}>
                <h2>Lista de Eventos</h2>
                {eventos.length > 0 ? (
                    eventos.map((evento) => (
                        <div key={evento.id} className="evento-item">
                            <p><strong>Título:</strong> {evento.titulo}</p>
                            <p><strong>Fecha:</strong> {evento.fecha}</p>
                            <p><strong>Lugar:</strong> {evento.lugar}</p>
                            <p><strong>Artistas:</strong> {evento.artistas}</p>
                            <p><strong>Precio:</strong> {evento.precio}</p>
                            <button
                                onClick={() => eliminarEvento(evento.id)}
                                style={{ marginTop: '10px', padding: '5px', backgroundColor: '#e53935', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Eliminar Evento
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay eventos registrados.</p>
                )}
            </div>

            <div className="editar-usuario">
                <EditarUsuario userId={localStorage.getItem('userId')} />
            </div>
            <div className="admin-section">
                <h2>Administración de Usuarios</h2>
                
            </div>
        </div>
    );
};

export default PrincipalAdmi;
