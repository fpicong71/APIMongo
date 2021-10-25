/* Importo el modulo express para conectar con el servidor */
const express= require("express");
const app= express();

/* Importo las rutas */
const profesionalRoutes= require("./routes/profesional.routes");
const peliculaRoutes= require("./routes/pelicula.routes");

/* Importo cors */
const cors = require ('cors');

/* Importo el archivo que gestiona los errores */
const manejadorErr = require("./error/manejadorErr");


/* CONFIGURACION SERVIDOR */
/* ---------------------- */

/* Configuro el puerto del servidor con el método .set */
app.set("port", process.env.PORT ||3000);

/* Configuro la respuesta del servidor
Que devuelva un json
Y urlencoded */
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

/* Indico al servidor que utilice las rutas de producto y usuario */
app.use(profesionalRoutes);
app.use(peliculaRoutes);

/* Middleware que gestiona la respuesta 
para que si no encuentra nada,
mande mensaje de que no ha encontrado url(endpoint) */
app.use((req,res, next)=>{
    res.status(404).json({message: "El Endpoint no existe"})
}
);

/* Middleware para el manejo de errores
Los errores están definidos en un archivo,
en la carpeta de error */
app.use(manejadorErr);

/* Exporto la conexion al servidor
Para que pueda ser usada en el index */
module.exports= app;
