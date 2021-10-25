/* Importo el driver mongoose para poder conectar con el servidor de Mongo */
const mongoose= require("mongoose");

/* Coneto con el servidor de BD
Primer parametro, la url de la conexión
Segundo parametro configuración de la respuesta
Lo gestiono con una promesa: 
Si se conecta informa de que está conectada
Si no, lanza el error - 
    useCreateIndex: true, useFindAndModify: true,*/
mongoose.connect("mongodb://localhost:27017/IMDB", { useNewUrlParser: true, useUnifiedTopology:true
})
.then((dbconexion)=>{console.log("Conectados a la DB IMDB -> ", dbconexion.connection.host)})
.catch((err)=>{ console.log(err)})