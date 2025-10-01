import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "../styles/Calentario.css"

const Calendario = ({ eventos, setEventos }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    const agregarEvento = () => {
        const nuevoEvento = {
            fecha: selectedDate,
            lugar: 'Nuevo Lugar',
            artistas: 'Nuevo Artista',
            precio: '$0',
        };
        setEventos([...eventos, nuevoEvento]);
    };

    const eliminarEvento = (index) => {
        const nuevosEventos = eventos.filter((_, i) => i !== index);
        setEventos(nuevosEventos);
    };

    const eventosDelDia = eventos.filter(evento => evento.fecha === selectedDate);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Calendario de Eventos</h1>
            <Calendar onChange={handleDateChange} />

            {selectedDate && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Eventos para {selectedDate}</h2>
                    {eventosDelDia.length > 0 ? (
                        eventosDelDia.map((evento, index) => (
                            <div key={index} style={{ border: '1px solid #f50505ff', padding: '10px', margin: '10px' }}>
                                <p><strong>Lugar:</strong> {evento.lugar}</p>
                                <p><strong>Artistas:</strong> {evento.artistas}</p>
                                <p><strong>Precio:</strong> {evento.precio}</p>
                                <button onClick={() => eliminarEvento(index)} style={{ marginTop: '10px', padding: '5px', backgroundColor: '#e53935', color: '#093e93ff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                    Eliminar Evento
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay eventos para esta fecha.</p>
                    )}
                    <button onClick={agregarEvento} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#6200ea', color: '#ff0000ff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Agregar Evento
                    </button >
                </div>
            )}
        </div>
    );
};

export default Calendario;