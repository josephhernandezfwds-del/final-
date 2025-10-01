// Componente principal de la aplicación (versión alternativa o de desarrollo).
// Este archivo configura el enrutamiento básico de la app usando React Router.
// Incluye una barra de navegación simple y rutas para inicio, login y registro.
// Nota: La aplicación principal usa el componente Routing.jsx en su lugar.
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from '../components/login';
import CrearCuenta from '../pages/CrearCuenta';
import Inicio from '../pages/Inicion';

// Componente funcional que define la estructura de la aplicación.
const App = () => {
    return (
        // BrowserRouter envuelve la app para habilitar el enrutamiento del lado cliente.
        <Router>
            // Barra de navegación con enlaces a las rutas principales.
            <nav style={{ textAlign: 'center', margin: '20px' }}>
                <Link to="/" style={{ margin: '10px' }}>Inicio</Link>
                <Link to="/login" style={{ margin: '10px' }}>Login</Link>
                <Link to="/registro" style={{ margin: '10px' }}>Crear Cuenta</Link>
            </nav>
            // Routes define las rutas y los componentes que se renderizan para cada una.
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<CrearCuenta />} />
            </Routes>
        </Router>
    );
};

export default App;
