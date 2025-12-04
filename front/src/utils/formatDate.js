// src/utils/formatDate.js
export function formatDate(fechaISO) {
  if (!fechaISO) return "-"; // por si es undefined o null
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // meses 0-11
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
