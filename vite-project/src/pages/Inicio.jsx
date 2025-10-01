import CrearRegistroP from '../components/Login'
import Calendario from '../components/Calendario'
import EditarUsuario from '../components/EditarUsuario'
import "../styles/inicion.css"


const Inicio = () => {
  return (
    <div>
        <CrearRegistroP/>

        <EditarUsuario userId={1}/>
    </div>
  )
}

export default Inicio
