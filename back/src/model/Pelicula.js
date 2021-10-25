/* En este archivo defino el esquema y el modelo de la Coleccion pwliculas*/

/* Importo el driver de conexión a servidor MongoDB, mongoose
Necesario para conectar al servidor de base de datos, 
y así poder hacer peticiones*/
const {Schema, model}= require("mongoose");

/* Defino el Schema de Pelicula */
/* ------------------------ */

/* peliculaSchema recoge el esquema de la coleccion:
 sus atributos, tipo, validaciones y middleware */
const peliculaSchema = new Schema({
    cartel:   {
        type : String,
        minlength :   [5,"Longitud mínima 5 caracteres"]
    },
    titulo : {
        type      :   String,
        required  :   [true,"Campo requerido"],
        minlength :   [2,"Longitud mínima 2 caracteres"],
        maxlength :   [50,"Longitud máxima 50 caracteres"]
    },
    anio :{
        type        :   Date
    },
    genero:{
        type        :   [String],
        default     :   []
    } ,
    nacionalidad:{
        type        :   String,
        minlength :   [2,"Longitud mínima 2 caracteres"],
        maxlength :   [50,"Longitud máxima 50 caracteres"]
    },
    actores :{
        type        :   [{type:Schema.Types.ObjectId, ref:"Profesionales"}],
        default     :   []
    },  
    directores:{
        type        :   [{type:Schema.Types.ObjectId, ref:"Profesionales"}],
        default     :   []
    },
    guionistas:{
        type        :   [{type:Schema.Types.ObjectId, ref:"Profesionales"}],
        default     :   []
    },
    productores:{
        type        :   [{type:Schema.Types.ObjectId, ref:"Profesionales"}],
        default     :   []
    },
    sinopsis:{
        type      :   String,
        minlength :   [2,"Longitud mínima 2 caracteres"],
        maxlength :   [1500,"Longitud máxima 50 caracteres"]
    }
});


/* Exporto el esquema y el modelo */
module.exports = model("Peliculas", peliculaSchema);