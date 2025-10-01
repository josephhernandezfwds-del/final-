// Archivo principal de entrada de la aplicación React.
// Este archivo inicializa la aplicación montando el componente de enrutamiento en el DOM.
// Importa React para crear componentes, ReactDOM para renderizar en el navegador, y el componente Routing que maneja las rutas de la app.
import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./router/Routing";

// Crea una raíz de React en el elemento con id 'root' del HTML y renderiza la aplicación.
// Usa StrictMode para detectar problemas potenciales en el código durante el desarrollo.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
