// Componente de enrutamiento principal de la aplicación.
// Este archivo configura todas las rutas de la app usando React Router.
// Define las páginas y componentes que se renderizan según la URL.
// Importa componentes de páginas y componentes necesarios para las rutas.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import RegistrarCuenta from "../pages/RegistrarCuenta";
import VentaEntradas from "../pages/principal";
import PrincipalAdmi from "../pages/principaladmi";
import EditarUsuario from "../components/EditarUsuario";
import InicioUsuario from "../pages/InicioUsuario";
import Perfil from "../pages/Perfil";
import EventoIndividual from "../pages/EventoIndividual";

// Componente funcional que retorna el enrutador con todas las rutas definidas.
function Routing() {
  return (
    // BrowserRouter habilita la navegación sin recargar la página.
    <Router>
      // Routes agrupa todas las rutas de la aplicación.
      <Routes>
        // Ruta raíz: página de inicio.
        <Route path="/" element={<Inicio />} />
        // Ruta para registro de nueva cuenta.
        <Route path="/registro" element={<RegistrarCuenta />} />
        // Ruta principal para venta de entradas (usuario regular).
        <Route path="/principal" element={<VentaEntradas />} />
        // Ruta principal para administrador.
        <Route path="/principaladmi" element={<PrincipalAdmi />} />
        // Ruta para editar usuario.
        <Route path="/editar-usuario" element={<EditarUsuario />} />
        // Ruta de inicio de sesión de usuario.
        <Route path="/inicio-usuario" element={<InicioUsuario />} />
        // Ruta para ver el perfil del usuario.
        <Route path="/perfil" element={<Perfil />} />
        // Ruta para ver detalles de un evento individual.
        <Route path="/evento" element={<EventoIndividual />} />
        // Ruta alternativa para venta de entradas.
        <Route path="/venta" element={<VentaEntradas />} />
      </Routes>
    </Router>
  );
}

export default Routing;
