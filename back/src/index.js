/* Importo el servidor express */
const app= require("./app");

/* Importo la conexión a DB mongoose */
require("./conexion");

/* Puerto del servidor */
app.listen(app.get("port"), ()=>{console.log("Servidor escuchando puerto ", app.get("port"))});