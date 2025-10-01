const PlantillaEvento = ({titulo, descripcion, artistas, fecha,precio}) => {
  return (
    <div>
        <h3>{titulo}</h3>
        <h3>{descripcion}</h3>
        <h3>{artistas}</h3>
        <p>{fecha}</p>
        <p>{precio}</p>
    </div>
  )
}

export default PlantillaEvento
