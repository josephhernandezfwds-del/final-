import { useEffect, useState } from "react";
import PlantillaEvento from "../components/PlantillaEvento";
import { fetchData } from "../services/fetch";
import MetodoPago from "../components/MetodoPago";
import "../styles/EventoIndividual.css";
import { useNavigate } from "react-router-dom";

const EventoIndividual = () => {
    const [eventos, setEventos] = useState({});
    const [total, setTotal] = useState(0);
    const [verPago, setVerPago] = useState(false);
    const [cantidadEntradas, setCantidadEntradas] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchEventos() {
            const peticion = await fetchData("eventos");
            const eventoIndividual = peticion.find(
                (evento) => evento.id === localStorage.getItem("eventoId")
            );
            setEventos(eventoIndividual || {});

            const cantidad = parseInt(localStorage.getItem("cantidadEntradas"), 10) || 0;
            setCantidadEntradas(cantidad);

            const precio = parseFloat(localStorage.getItem("precioTotal")) || 0;
            setTotal(precio);
        }
        setTimeout(() => {
            navigate('/principal');
        }, 1800000) // Cuando pasan 30min se sale de la pagina
        fetchEventos();
    }, []);

    const manejarPago = (detallesPago) => {
        console.log("Detalles de pago:", detallesPago);
        alert(`Pago realizado con éxito usando ${detallesPago.metodo}. Gracias por tu compra.`);
        navigate('/principal')
    };

    return (
        <div id="evento-container">
            <div id="evento-header">
                {eventos.imagen && (
                    <img src={eventos.imagen} alt={eventos.titulo} style={{ width: "300px", display: "block", margin: "0 auto 20px" }} />
                )}
                <PlantillaEvento
                    key={eventos.id}
                    titulo={eventos.titulo}
                    descripcion={eventos.descripcion}
                    artistas={eventos.artistas}
                    fecha={eventos.fecha}
                />
            </div>

            <div id="evento-info">
                <p id="cantidad-entradas">Cantidad de entradas compradas: {cantidadEntradas}</p>
                <p id="total-pagar">Total a pagar: ${total}</p>
            </div>

            <div id="pago-container">
                <MetodoPago precio={total} onPagar={manejarPago} mostrar={setVerPago} />
                
            </div>
        </div>
    );
};

export default EventoIndividual;
