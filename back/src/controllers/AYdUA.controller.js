// --------------------------
// IMPORTACIONES
// --------------------------

// Importamos los servicios (funciones que manejan la lógica de negocio y la base de datos)
import * as service from "../services/elemento.service.js";

// --------------------------
// CONTROLADORES
// --------------------------

// FUNCION 1: LISTAR ELEMENTOS
// --------------------------
// Esta función recibe la solicitud del usuario (req) y devuelve la respuesta (res)
// CONTROLADOR → llama al SERVICE (Modelo) y devuelve los datos a la VISTA
export async function listarElementos(req, res) {
  try {
    // Llamamos al SERVICE para obtener todos los elementos
    const elementos = await service.listarElementos();

    // Respondemos a la VISTA con los elementos en formato JSON
    res.json({ ok: true, elementos });
  } catch (e) {
    // Si ocurre un error, respondemos con status 400 y mensaje de error
    res.status(400).json({ ok: false, error: e.message });
  }
}

// FUNCION 2: CREAR ELEMENTO
// --------------------------
// CONTROLADOR que recibe los datos del formulario de la VISTA y crea un nuevo elemento
export async function crearElemento(req, res) {
  try {
    // Llamamos al SERVICE para crear el elemento, pasando los datos del cuerpo de la solicitud
    // y el ID del usuario que está logueado
    const e = await service.crearElemento({
      ...req.body,
      usuarioId: req.user.id,
    });

    // Respondemos a la VISTA con el nuevo elemento
    res.json({ ok: true, elemento: e });
  } catch (e) {
    // Si hay error, respondemos con status 400 y mensaje de error
    res.status(400).json({ ok: false, error: e.message });
  }
}

// FUNCION 3: CAMBIAR ESTADO DE UN ELEMENTO
// --------------------------
// CONTROLADOR que recibe la solicitud de cambiar el estado de un elemento
export async function cambiarEstadoElemento(req, res) {
  try {
    // Llamamos al SERVICE para cambiar el estado, pasando:
    // - id del elemento (desde la URL)
    // - nuevo estado (desde el cuerpo de la solicitud)
    // - usuario que hizo el cambio
    const updated = await service.cambiarEstadoElemento(
      Number(req.params.id),
      req.body.estado,
      req.user.id
    );

    // Respondemos a la VISTA con el elemento actualizado
    res.json({ ok: true, updated });
  } catch (e) {
    // Si hay error, respondemos con status 400 y mensaje de error
    res.status(400).json({ ok: false, error: e.message });
  }
}

// --------------------------
// FLUJO MVC RESUMIDO
// --------------------------
// 1. VISTA: el usuario hace clic o envía un formulario → envía req al CONTROLADOR
// 2. CONTROLADOR: valida datos y llama al SERVICE (Modelo) para procesar la acción
// 3. SERVICE/Modelo: accede a la base de datos y devuelve los resultados al CONTROLADOR
// 4. CONTROLADOR: puede crear historial, notificaciones y prepara la respuesta
// 5. VISTA: recibe la respuesta en JSON y muestra la información en la pantalla
