/* Importo express para conectarnos al servidor */
const Router = require("express");

/* Importamos el modelo de usuario y su controlador */
const Pelicula = require("../model/Pelicula");
const peliController = require("../controller/pelicula.controller");

/* Le indicamos al enrutador que enrute */
const router = Router();

/* Métodos CRUD
Parametro 1. el endpoint
Parámetro 2. el método definido en el controlaldor */

/* GET /peliculas*/
router.get("/peliculas", peliController.obtenerPelicula);

/* GET /peliculas/actor */
router.get("/peliculas/actor?id=", peliController.actoresPelicula);
router.get("/peliculas/actor:", peliController.actoresPelicula);

/* GET /peliculas/director*/
router.get("/peliculas/director?id=", peliController.directoresPelicula);
router.get("/peliculas/director:", peliController.directoresPelicula);

/* GET /peliculas/guionista*/
router.get("/peliculas/guionista?id=", peliController.guionistasPelicula);
router.get("/peliculas/guionista:", peliController.guionistasPelicula);

/* GET /peliculas/productora*/
router.get("/peliculas/productora?id=", peliController.productoraPelicula);
router.get("/peliculas/productora:", peliController.productoraPelicula);

/* POST /peliculas*/
router.post("/peliculas", peliController.crearPelicula);

/* POST /peliculas/actor*/
router.post("/peliculas/actor", peliController.aniadirActor);

/* POST /peliculas/director*/
router.post("/peliculas/director", peliController.aniadirDirector);

/* POST /peliculas/guionista*/
router.post("/peliculas/guionista", peliController.aniadirGuionista);

/* PUT /peliculas*/
router.put("/peliculas", peliController.modificarPelicula);

/* DELETE/peliculas*/
router.delete("/peliculas", peliController.eliminarPelicula);

/* DELETE/peliculas/actor*/
router.delete("/peliculas/actor", peliController.eliminarActor);

/* DELETE/peliculas/director*/
router.delete("/peliculas/director", peliController.eliminarDirector);

/* DELETE/peliculas/guionista*/
router.delete("/peliculas/guionista", peliController.eliminarGuionista);


/* Exporto el router */
module.exports= router;