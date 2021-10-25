/* Importo express para conectarnos al servidor */
const Router = require("express");

/* Importamos el modelo de usuario y su controlador */
const Profesional = require("../model/Profesional");
const profController = require("../controller/profesional.controller");

/* Le indicamos al enrutador que enrute */
const router = Router();

/* Métodos CRUD
Parametro 1. el endpoint
Parámetro 2. el método definido en el controlaldor */
/* POST /profesionales*/
router.post("/profesionales", profController.crearProfesional);

/* GET /profesionales */
router.get("/profesionales", profController.obtenerProfesional);
router.get("/profesionales?id=", profController.obtenerProfesional);
router.get("/profesionales:", profController.obtenerProfesional);

/* PUT /profesionales */
router.put("/profesionales", profController.modificarProfesional);

/* DELETE /profesionales */
router.delete("/profesionales", profController.eliminarProfesional);


/* Exporto el router */
module.exports= router;