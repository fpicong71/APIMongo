
/* Creo un método para la gestión de los errores */
const manejadorErr=(err, req, res, next)=>{
    res.status(500).json({message: err.message});
}

/* Exporto el método para poder ser importado y usado en la app */
module.exports = manejadorErr;