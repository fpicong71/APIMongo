/* En este archivo defino el esquema y el modelo de la Coleccion profesionals*/

/* Importo el driver de conexión a servidor MongoDB, mongoose
Necesario para conectar al servidor de base de datos, 
y así poder hacer peticiones*/
const {Schema, model}= require("mongoose");

/* Defino el Schema de Profesional */
/* ------------------------ */

/* profesionalSchema recoge el esquema de la coleccion:
 sus atributos, tipo, validaciones y middleware */
const profesionalSchema = new Schema({
    foto:   {
        type : String,
        minlength :   [5,"Longitud mínima 5 caracteres"]
    },
    nombre : {
        type      :   String,
        required  :   [true,"Campo requerido"],
        minlength :   [5,"Longitud mínima 5 caracteres"],
        maxlength :   [25,"Longitud máxima 25 caracteres"]
    },
    edad :{
        type        :   Number,
        min         :   0,
        max         :   150  
    },
    nacionalidad:{
        type        :   String,
        minlength   :   [2,"Longitud mínima 2 caracteres"],
        maxlength   :   [30,"Longitud máxima 30 caracteres"],

    } ,
    oscars:{
        type        :   Number,
        min         :   0,
        max         :   100

    },
    profesion :{
        type        :   [String],
        default     :   []
    },  
    bio:{
        type        :   String,
        minlength   :   [15,"Longitud mínima 15 caracteres"],
        maxlength   :   [200,"Longitud máxima 200 caracteres"],
    },
    peliculas: [{type:Schema.Types.ObjectId, ref:"Peliculas"}]
});


/* Exporto el esquema y el modelo */
module.exports = model("Profesionales", profesionalSchema);