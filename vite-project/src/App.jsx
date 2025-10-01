import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from '../components/login';
import CrearCuenta from '../pages/CrearCuenta';
import Inicio from '../pages/Inicion';

const App = () => {
    return (
        <Router>
            <nav style={{ textAlign: 'center', margin: '20px' }}>
                <Link to="/" style={{ margin: '10px' }}>Inicio</Link>
                <Link to="/login" style={{ margin: '10px' }}>Login</Link>
                <Link to="/registro" style={{ margin: '10px' }}>Crear Cuenta</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<CrearCuenta />} />
            </Routes>
        </Router>
    );
};

export default App;