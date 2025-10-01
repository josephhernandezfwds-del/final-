import React from 'react'
import Evento from './Evento'
import "../styles/Listaeventos"

const ListaEventos = ({ eventos, onEliminar }) => {
  return (
    <div>
      {eventos.map((evento, index) => (
        <Evento
            key={index}
            titulo={evento.titulo}
            fecha={evento.fecha}
            lugar={evento.lugar}
            artistas={evento.artistas}
            precio={evento.precio}
            descripcion={evento.descripcion}
            onEliminar={() => onEliminar(index)}
        />
     ))}            
    </div>
  )
}

export default ListaEventos
