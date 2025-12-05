// --------------------------
// IMPORTACIONES
// --------------------------

// PrismaClient nos permite conectarnos con la base de datos (Modelo)
import { PrismaClient } from "@prisma/client";

// Importamos funciones de servicios para historial y notificaciones
import { crearHistorial } from "./historial.service.js";
import { crearNotificacion } from "./notificacion.service.js";

// Creamos la instancia de Prisma para usarla en todas las funciones (Modelo)
const prisma = new PrismaClient();

// --------------------------
// FUNCIONES / CONTROLADORES
// --------------------------

// FUNCION 1: LISTAR ELEMENTOS
// --------------------------
// Esta función actúa como CONTROLADOR: recibe la acción del usuario
// y decide consultar al MODELO para obtener todos los datos
// La VISTA es la que mostrará estos datos en pantalla
export async function listarElementos() {
  // Llamamos al MODELO (base de datos) para traer todos los elementos
  // prisma.elemento.findMany() devuelve un array con todos los elementos
  return await prisma.elemento.findMany();
}

// FUNCION 2: CREAR ELEMENTO
// --------------------------
// Esta función es un CONTROLADOR: recibe los datos del formulario
// y decide cómo crear el elemento, crear historial y notificaciones
export async function crearElemento({ titulo, descripcion, usuarioId }) {
  // VALIDACIÓN: Si no hay descripción, mostramos error
  // Esto evita que se creen elementos vacíos
  if (!descripcion) throw new Error("La descripción es obligatoria");

  // Si no se pasó un título, ponemos uno por defecto
  const tituloFinal = titulo || "Sin Titulo";

  // LLAMADA AL MODELO: Creamos el elemento en la base de datos
  const e = await prisma.elemento.create({
    data: { titulo: tituloFinal, descripcion, usuarioId },
  });

  // LLAMADA AL MODELO: Creamos un historial con estado inicial "creado"
  await prisma.historial.create({
    data: {
      estadoViejo: null, // no había estado antes
      estadoNuevo: "creado", // estado inicial
      usuario: { connect: { id: usuarioId } }, // quién creó el elemento
      elemento: { connect: { id: e.id } }, // conectamos con el elemento
    },
  });

  // LLAMADA AL MODELO: Buscamos todos los administradores
  const admins = await prisma.usuario.findMany({ where: { rol: "admin" } });

  // Creamos notificaciones para cada administrador
  for (const a of admins) {
    await crearNotificacion(a.id, `Nuevo elemento #${e.id}`);
  }

  // DEVOLVEMOS el elemento creado para que la VISTA lo pueda mostrar
  return e;
}

// FUNCION 3: CAMBIAR ESTADO DE UN ELEMENTO
// --------------------------
// CONTROLADOR que recibe una acción de cambiar el estado de un elemento
export async function cambiarEstadoElemento(id, nuevoEstado, usuarioId) {
  // LLAMADA AL MODELO: obtenemos el elemento antes de cambiarlo
  const antes = await prisma.elemento.findUnique({ where: { id } });

  // LLAMADA AL MODELO: actualizamos el estado del elemento
  const updated = await prisma.elemento.update({
    where: { id },
    data: { estado: nuevoEstado },
  });

  // LLAMADA AL MODELO: registramos el cambio de estado en el historial
  await crearHistorial({
    entidad: "Elemento", // tipo de entidad que cambió
    referenciaId: id, // id del elemento
    estadoViejo: antes?.estado || null, // estado anterior
    estadoNuevo: nuevoEstado, // estado nuevo
    usuarioResponsable: usuarioId, // quién hizo el cambio
  });

  // Si el elemento tiene un dueño, le enviamos notificación
  if (antes?.usuarioId)
    await crearNotificacion(
      antes.usuarioId,
      `Elemento #${id} fue ${nuevoEstado}`
    );

  // DEVOLVEMOS el elemento actualizado para que la VISTA lo pueda mostrar
  return updated;
}

// --------------------------
// FLUJO MVC RESUMIDO
// --------------------------
// 1. El usuario hace clic en un botón o envía un formulario → VISTA envía datos al CONTROLADOR
// 2. El CONTROLADOR valida los datos y decide qué hacer
// 3. El CONTROLADOR llama al MODELO (Prisma) para leer o modificar la base de datos
// 4. El MODELO devuelve los datos al CONTROLADOR
// 5. El CONTROLADOR puede crear historial y notificaciones (lógica extra)
// 6. El CONTROLADOR devuelve los resultados a la VISTA
// 7. La VISTA muestra los datos actualizados en la pantalla
