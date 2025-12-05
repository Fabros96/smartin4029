// --------------------------
// IMPORTACIONES
// --------------------------

// Express nos ayuda a manejar las rutas de la aplicación (qué pasa cuando el usuario entra a una URL)
import express from "express";

// Importamos los controladores (las funciones que manejan la lógica de negocio)
import * as ctrl from "../controllers/elemento.controller.js";

// Middleware para validar autenticación
import { auth } from "../middleware/auth.middleware.js";

// Middleware para verificar roles de usuario (ej: admin, especial)
import { requireRole } from "../middleware/requireRole.middleware.js";

// Creamos el router de Express
const router = express.Router();

// --------------------------
// RUTAS / ENDPOINTS
// --------------------------

// 1. LISTAR ELEMENTOS
// Ruta GET: cuando el usuario va a "/elementos"
// CONTROLADOR: ctrl.listarElementos
// MIDDLEWARE: auth → verifica que el usuario esté logueado
// La VISTA será la que muestre la lista de elementos
router.get("/elementos", auth, ctrl.listarElementos);

// 2. CREAR ELEMENTO
// Ruta POST: cuando el usuario envía un formulario para crear un elemento
// CONTROLADOR: ctrl.crearElemento
// MIDDLEWARE: auth → solo usuarios logueados pueden crear
router.post("/elementos", auth, ctrl.crearElemento);

// 3. CAMBIAR ESTADO DE UN ELEMENTO
// Ruta PATCH: cuando se quiere cambiar el estado de un elemento (ej: de "pendiente" a "resuelto")
// CONTROLADOR: ctrl.cambiarEstadoElemento
// MIDDLEWARE:
//   auth → verifica que el usuario esté logueado
//   requireRole(["admin", "especial"]) → solo ciertos roles pueden cambiar el estado
router.patch(
  "/elementos/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstadoElemento
);

// --------------------------
// EXPORTAR ROUTER
// --------------------------
// Este router se conectará en app.js o main.js para que estas rutas estén activas
export default router;

/*
FLUJO MVC RESUMIDO:

1. VISTA: el usuario hace clic o envía un formulario → hace una solicitud a una URL
2. ROUTER: recibe la solicitud y decide qué CONTROLADOR debe ejecutar
3. CONTROLADOR: valida los datos y llama al MODELO (base de datos) para hacer la acción
4. MODELO: Prisma (o la base de datos) devuelve los datos al CONTROLADOR
5. CONTROLADOR: puede crear historial, notificaciones, o devolver la respuesta
6. VISTA: recibe la respuesta y muestra la información en pantalla
*/
