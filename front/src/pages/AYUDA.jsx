// src/pages/Elementos.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Cliente Axios para hacer solicitudes HTTP
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/formatDate";

/*
  Página para listar ELEMENTOS y cambiar su estado (solo admin/especial puede cambiar)
  Esta es la VISTA en el flujo MVC:
  - Muestra los datos en pantalla
  - Llama al CONTROLADOR a través de la API (backend)
*/
export default function Elementos() {
  // Estado para guardar los elementos que vienen del backend
  const [elementos, setElementos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para mostrar carga

  // useEffect se ejecuta al cargar la página
  useEffect(() => {
    fetchElementos(); // Llamamos a la función que trae los elementos
  }, []);

  // FUNCION: Traer elementos desde el backend
  const fetchElementos = async () => {
    try {
      setLoading(true); // Mostramos que está cargando
      const res = await api.get("/elementos"); // Llamada al CONTROLADOR vía API
      setElementos(res.data.elementos); // Guardamos los datos en el estado
    } catch (err) {
      console.log(err);
      alert("Error al cargar elementos");
    } finally {
      setLoading(false); // Terminó la carga
    }
  };

  // FUNCION: Cambiar el estado de un elemento
  const cambiarEstado = async (id, estadoNuevo) => {
    try {
      await api.patch(`/elementos/${id}/estado`, { estado: estadoNuevo });
      fetchElementos(); // Volvemos a traer los elementos para actualizar la tabla
    } catch (err) {
      console.log(err);
      alert("Error al cambiar estado");
    }
  };

  // Si aún estamos cargando, mostramos un mensaje
  if (loading) return <div>Cargando elementos...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Elementos</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Creado</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {elementos.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.titulo}</td>
                <td>{e.descripcion}</td>
                <td>{e.estado}</td>
                <td>{e.usuarioId}</td>
                <td>{formatDate(e.createdAt)}</td>
                <td>{formatDate(e.updateAt)}</td>

                <td>
                  {/* Botones para cambiar el estado del elemento */}
                  <button onClick={() => cambiarEstado(e.id, "pendiente")}>
                    Pendiente
                  </button>
                  <button onClick={() => cambiarEstado(e.id, "aceptado")}>
                    Aceptado
                  </button>
                  <button onClick={() => cambiarEstado(e.id, "rechazado")}>
                    Rechazado
                  </button>
                  <button onClick={() => cambiarEstado(e.id, "cancelado")}>
                    Cancelado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
FLUJO MVC en esta página:

1. VISTA (esta página):
   - El usuario ve la tabla de elementos
   - Hace clic en botones para cambiar estado

2. CONTROLADOR (backend):
   - La API recibe la solicitud y llama al controlador correspondiente
   - Por ejemplo: GET /elementos → listarElementos
   - PATCH /elementos/:id/estado → cambiarEstadoElemento

3. MODELO (servicio / base de datos):
   - Prisma o servicio maneja los datos y devuelve la información al controlador

4. CONTROLADOR → VISTA:
   - El controlador envía la respuesta en JSON
   - La VISTA actualiza el estado y muestra los datos en la tabla
*/
