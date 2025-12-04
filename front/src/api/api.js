import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // 🔥 IMPORTANTE PARA COOKIES
});

export default api;
