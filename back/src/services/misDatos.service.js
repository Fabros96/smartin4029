import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function misDatos(id) {
  // Asegurate de recibir el id del usuario logeado
  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });
  //usuario tiene todos los datos del us logeado
  return usuario;
}

export async function actualizarMisDatos(id, viejosDatos, nuevosDatos) {
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (!usuario) throw new Error("Usuario no encontrado");

  const cambios = {};

  for (const key in nuevosDatos) {
    if (nuevosDatos.hasOwnProperty(key)) {
      if (viejosDatos[key] !== nuevosDatos[key]) {
        cambios[key] = nuevosDatos[key];
      }
    }
  }

  if (Object.keys(cambios).length === 0) {
    console.log("Sin cambios");
    return usuario;
  }

  // Actualizamos solo los campos que cambiaron
  const actualizado = await prisma.usuario.update({
    // 👈 antes estaba 'equipo', ahora 'usuario'
    where: { id },
    data: cambios,
  });

  console.log("Datos actualizados:", actualizado); // 👈 para ver los cambios
  return actualizado;
}
