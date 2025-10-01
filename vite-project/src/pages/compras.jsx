import { useState, useEffect } from "react";

export const useCompras = () => {
  const [compras, setCompras] = useState([]);

  
  const cargarCompras = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    try {
      const res = await fetch(`http://localhost:3001/compras?usuarioId=${usuario.id}`);
      if (!res.ok) throw new Error("Error al cargar compras");
      const data = await res.json();
      setCompras(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarCompras();
  }, []);

  return { compras, cargarCompras, setCompras };
};
