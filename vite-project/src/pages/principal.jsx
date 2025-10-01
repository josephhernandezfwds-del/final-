import  { useEffect, useState } from 'react';
import { fetchData, postData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';
import MetodoPago from '../components/MetodoPago';
import "../styles/Principal.css";
const VentaEntradas = () => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [total, setTotal] = useState(0);
    const [mostrarImg, setMostrarImg] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [mostrarInput, setMostrarInput] = useState(false);
    const [entradasCantidad, setEntradasCantidad] = useState(0);
    const [sumarPrecio, setSumarPrecio] = useState(0);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();


    const fetchUsuarioActual = async () => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            const user = JSON.parse(usuarioGuardado);
            setUsuario(user);
            setNombre(user.nombre);
        }
    };

    useEffect(() => {
        fetchUsuarioActual();
    }, []);


    useEffect(() => {
        const fetchEventos = async () => {
            const peticion = await fetchData("eventos");
            setEventos(peticion || []);
        };
        fetchEventos();
    }, []);


    useEffect(() => {
        const fetchUsuarios = async () => {
            const peticion = await fetchData("usuarios");
            setUsuarios(peticion || []);
        };
        fetchUsuarios();
    }, []);

    useEffect(() => {
        setUsuariosFiltrados(usuarios);
    }, [usuarios]);


    const handleBusquedaChange = (e) => {
        const valorBusqueda = e.target.value;
        setBusqueda(valorBusqueda);
        const filtrados = usuarios.filter((usuario) =>
            usuario.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
        );
        setUsuariosFiltrados(filtrados);
    };


    const calcularTotal = (cantidad) => {
        setTotal(cantidad * precio);
    };


    const manejarCompra = () => {
        alert(`Gracias por tu compra, ${nombre}! Total: $${total}`);
        setMostrarImg(true);
        setTimeout(() => setMostrarImg(false), 5000);
    };


    const manejarPago = (detallesPago) => {
        console.log('Detalles de pago:', detallesPago);
        alert(`Pago realizado con éxito usando ${detallesPago.metodo}. Gracias por tu compra.`);
    };


    const toggleInput = () => {
        setMostrarInput(!mostrarInput);
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


    if (!Array.isArray(eventos) || eventos.length === 0) {
        return <p>No hay entradas disponibles.</p>;
    }

    return (
        <div className='fondoPrin'>
            {usuario && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '10px',
                    borderRadius: '10px',
                    border: '1px solid #00ffff'
                }}>
                    <img
                        src={usuario.foto || "https://via.placeholder.com/50"}
                        alt="Foto de perfil"
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            border: "2px solid #FF00FF",
                            marginRight: "10px"
                        }}
                    />
                    <span style={{ color: '#00ffff' }}>{usuario.nombre}</span>
                </div>
            )}
            <h2>Bienvenido, {nombre ? nombre : "Invitado"}!</h2>
            <button
                onClick={() => navigate("/perfil")}
                style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
            >
                Ir a Perfil
            </button>

            <div>
                <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    value={busqueda}
                    onChange={handleBusquedaChange}
                />
            </div>

            <div>
                <h2>Lista de Usuarios</h2>
                {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((usuario, index) => (
                        <div key={index} className="usuario-item">
                            <p><strong>Nombre:</strong> {usuario.nombre}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron usuarios.</p>
                )}
            </div>

            {mostrarImg && (
                <div>
                    <h2>¡Gracias por tu compra!</h2>
                    <img src="../src/image/qr-code-7819653_1280.jpg" alt="Gracias por su compra" style={{ width: '300px', marginTop: '20px' }} />
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <h2>Lista de Eventos</h2>
                {eventos.map((evento, index) => (
                    <div key={index} className="evento-item">
                        <p><strong>Título:</strong> {evento.titulo}</p>
                        <p><strong>Fecha:</strong> {evento.fecha}</p>
                        <p><strong>Lugar:</strong> {evento.lugar}</p>
                        <p><strong>Artistas:</strong> {evento.artistas}</p>
                        <p><strong>Precio:</strong> {evento.precio}</p>
                        <button
                            onClick={() => {
                                navigate('/evento');
                                localStorage.setItem('eventoId', evento.id);
                                localStorage.setItem('evento', JSON.stringify(evento));
                            }}
                        >Ir</button>

                        <div>
                            <button
                                onClick={() => {
                                    toggleInput();
                                    const entradasPrecio = parseInt(evento.precio, 10);
                                    localStorage.setItem('precioEvento', entradasPrecio);
                                    setSumarPrecio(entradasPrecio);
                                }}
                                style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}
                            >
                                {mostrarInput ? 'Confirmar' : 'Seleccione la cantidad de entradas'}
                            </button>

                            {mostrarInput && (
                                <input
                                    type="number"
                                    placeholder="Ingrese un número"
                                    style={{ padding: '10px', marginTop: '10px', width: '80%' }}
                                    onChange={(e) => {
                                        const cantidad = parseInt(e.target.value, 10);
                                        setEntradasCantidad(cantidad);
                                        const totalPrecio = cantidad * sumarPrecio;
                                        setTotal(totalPrecio);
                                        localStorage.setItem('precioTotal', totalPrecio);
                                        localStorage.setItem('cantidadEntradas', cantidad);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default VentaEntradas;
