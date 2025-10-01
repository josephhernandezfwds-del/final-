import React from 'react'


const Evento = ({titulo,fecha,lugar,artistas,precio,descripcion,onEliminar}) => {
  return (
    <div>
        <h3>{titulo}</h3>
        <p>{fecha}</p>
        <p>{lugar}</p>
        <p>{artistas}</p>
        <p>{precio}</p>
        <p>{descripcion}</p>
        {onEliminar && (
          <button 
            onClick={onEliminar} 
            style={{ marginTop: '10px', padding: '5px', backgroundColor: '#e53935', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Eliminar Evento
          </button>
        )}
    </div>
  )
}

export default Evento
