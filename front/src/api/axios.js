import axios from "axios";

/*
  Este archivo crea una instancia global de Axios.
  Se usa para todas las peticiones al backend.
  withCredentials permite enviar cookies de sesión.
*/

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default api;
