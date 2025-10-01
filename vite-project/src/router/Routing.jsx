import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import RegistrarCuenta from "../pages/RegistrarCuenta";
import VentaEntradas from "../pages/principal";
import PrincipalAdmi from "../pages/principaladmi";
import EditarUsuario from "../components/EditarUsuario";
import InicioUsuario from "../pages/InicioUsuario";
import Perfil from "../pages/Perfil";
import EventoIndividual from "../pages/EventoIndividual";


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<RegistrarCuenta />} />
        <Route path="/principal" element={<VentaEntradas />} />
        <Route path="/principaladmi" element={<PrincipalAdmi />} />
        <Route path="/editar-usuario" element={<EditarUsuario />} />
        <Route path="/inicio-usuario" element={<InicioUsuario />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/evento" element={<EventoIndividual />} />
        <Route path="/venta" element={<VentaEntradas />} />
      </Routes>
    </Router>
  );
}

export default Routing;
