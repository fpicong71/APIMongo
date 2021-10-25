/* Importo el modelo. 
En este caso el modelo de user */
const Profesional = require("../model/Profesional");
const Pelicula = require("../model/Pelicula")

/* METODOS DE PROFESIONAL */
/* ********************** */

/* POST - crearProfesional -> 
Añade un nuevo profesional a la lista de profesionales */
const crearProfesional = async(req,res,next) =>
{
    try
    {
        /* Intento crear el profesional */

        /* Recojo del request los valores de los campos para crear el documento */
        const {foto,nombre,edad,nacionalidad,oscars,profesion,bio,peliculas} = req.body;

        /* doc recoge todos los valores pasados en la request para crear un documento */
        let doc = new Profesional({
            "foto"      :   foto,
            "nombre"    :   nombre,
            "edad"      :   edad,
            "nacionalidad": nacionalidad,
            "oscars"    :   oscars,
            "profesion" :   profesion,
            "bio"       :   bio,
            "peliculas" :   peliculas
        })

        /* Creo el nuevo documento */
        await doc.save()
        .then( result =>
            {
                res.status(200).json(
                    {
                        body:       result,
                        message:    "Profesional añadido"
                    });
            })
        .catch(err=>
            {
                /* Se ha producido un error al crear el profesional */
                console.log("Error al intentar hacer insert del nuevo profesional - " + err);
                throw err;
            });
    }
    catch(err)
    {
        /* Se ha producido un error al crear el profesional */
        console.log("Error al intentar hacer POST del nuevo profesional");
        next(err);
    }
}

/* GET - obtenerProfesional -> 
Añade un nuevo profesional a la lista de profesionales */
const obtenerProfesional = async(req,res,next) =>
{

    /* Intento obtener el profesional */

    /* Recojo del request los valores de los campos para crear el documento */
    console.log("Query: " + req.query);
    for(let it in req.query){
        console.log("it: " + it);
        console.log("req.query[it]: " + req.query[it]);
        console.log(typeof req.query[it]);
    }
    const {id} = req.query;

    console.log("id: " + id);

    /* Compruebo si la request tiene _id o no */
    if(id)
    {   /* Si tengo id */
        try
        {
            /* Intento encontrar al profesional por su id */
            await Profesional.findById(id).populate('peliculas').exec()
            .then(result=>
                {
                    /* La busqueda por id ha tenido éxito. Configuro la respuesta */
                    res.status(200).json(
                        {
                            body:       result,
                            message:    "Profesional " + id
                                    + " encontrado"
                        });
                })
            .catch(err=>
                {
                    /* Error al encontrar profesional por id */
                    console.log("Error buscar profesional con Id " + id
                    + "-> " + err);    
                });
        }
        catch(err)
        {
            /* Se ha producido un error al obtener los datos del profesional con ID */
            console.log("Error al intentar hacer GET del profesional con ID" + id);
            next(err);
        }
    }
    else
    {
        /* No tengo id. Tiene que buscar todos los profesionales */
        try
        {
            /* Intento buscar a todos los profesionales */
            await Profesional.find().populate('peliculas').exec()
            .then(result=>
                {
                    /* Configuro la respuesta */
                    res.status(200).json(
                        {
                            body:       result,
                            message:    "Profesionales encontrados " 
                        });
                })
            .catch(err=>
                {
                    /* Error al encontrar todos losprofesional*/
                    console.log("Error al buscar todos los profesionales" + _id
                    + "-> " + err);    
                });
        }
        catch(err)
        {
            /* Se ha producido un error al obtener los datos del profesional con ID */
            console.log("Error al intentar hacer GET de los profesionales");
            next(err);
        }

    }

}

/* PUT - modificarProfesional */
const modificarProfesional = async (req,res,next) =>
{
    /* Recojo los valores a través de la request */
    const {_id,foto,nombre,edad,nacionalidad,oscars,profesion,bio,peliculas} = req.body;

    let aModificar =
    {
        "foto"          :   foto,
        "nombre"        :   nombre,
        "edad"          :   edad,
        "nacionalidad"  :   nacionalidad,
        "oscars"        :   oscars,
        "profesion"     :   profesion,
        "bio"           :   bio,
        "peliculas"     :   peliculas
    }

    let longModificar = 0;

    for(let clave in aModificar)
    {
        if(aModificar[clave])
        {          
            longModificar++;
        } 
    }

    console.log("Longitud de modificar:" + longModificar );

    /* Profesional.updateOne({_id:_id},{"nombre":nombre, "edad":edad, "nacionalidad":nacionalidad,"oscars":oscars,"profesion":profesion,"bio":bio,"peliculas":peliculas}) */
    let contador = 0
    let query = "{";

    if(_id)
    {
        /*Si tengo id -> Compruebo que valores tienen valor
        Y voy construyendo un string con clave:valor. 
        Con comillas para claves y valores.
        Si el valor es un array lo recorro, añadiendo sus valores*/
        for(let clave in aModificar)
        {
            if(aModificar[clave])
            {
                if(contador<(longModificar-1))
                {
                    if(clave == "profesion" || clave == "peliculas")
                    {
                        query += "\"" +  clave + "\": [";

                        let long = (aModificar[clave].length-1);

                        for(let i=0; i<=long; i++)
                        {
                            if(i==long)
                            {
                                query += "\"" + aModificar[clave][i] + "\"";
                                // console.log("i: "+ i + "-> " + query);
                            }
                            else
                            {
                                query += "\"" + aModificar[clave][i] + "\","; 
                                // console.log("i: "+ i + "-> " + query);
                            }
                        } 

                        query += "],"
                    }
                    else
                    {
                        query +=  "\"" + clave + "\":\"" + aModificar[clave] + "\",";    
                    }
                }
                else
                {
                    if(clave == "profesion" || clave == "peliculas")
                    {
                        query += "\"" +  clave + "\":[";

                        let long = aModificar[clave].length-1;

                        for(let i=0; i<=long; i++)
                        {
                            if(i==long)
                            {
                                query += "\"" + aModificar[clave][i] + "\"";
                                // console.log("i: "+ i + "-> " + query);
                            }
                            else
                            {
                                query += "\"" + aModificar[clave][i] + "\",";
                                // console.log("i: "+ i + "-> " + query);
                            }
                        } 

                        query += "]" 
                    }
                    else
                    {
                        query +=  "\"" + clave + "\":\"" + aModificar[clave] + "\""  
                    }  
                }
                contador++; 
            } 
        }
        query += "}";

        /* Como query es una cadena y necesito un json,
        lo parseo */
        query = JSON.parse(query);

        try
        {
            /* Intento actualizar el profesional */
            await Profesional.updateOne({_id:_id},query,{'multi':true}).exec()
            .then( result =>
                {
                    /* Tengo exito en la consulta a la BD, modifica el documento.
                    Configuro la respuesta */
                    res.status(200).json(
                        {
                            body:       result,
                            message:    "Profesional modificado "
                        });

                })
            .catch( err =>
                {
                    /* Error en la consulta a la BD */
                    console.log("Error al actualizar. Err: " + err);
                });
        }
        catch(err)
        {
            /* Error durante la consulta */
            console.log("Error al intentar actualizar al profesional con id: " + _id)
            throw err;
        }
    }
    else
    {
        /* No tengo id */
        console.log("No es posible modificar sin el id del profesional")
        next(err);
    }

}

/* DELETE - eliminarProfesional  */
const eliminarProfesional = async(req,res,next) =>
{
    const {_id} = req.body;

    if(_id)
    {
        try
        {
            await Profesional.deleteOne({_id:_id}).exec()
            .then( result=>
                { 
                    res.status(200).json(
                    {
                        body:       result,
                        message:    "Profesional Eliminado "
                    });

                })
            .catch( err =>
                {
                    console.log("Error al eliminar profesional");
                    throw err;
                });

        }
        catch (err)
        {
            console.log("Error al intentar eliminar profesional en la BD");
            next(err);
        }
    }
    else
    {
        console.log("IMPOSIBLE eliminar profesional sin id");
        next(err);
    }
}


/* Exporto las funciones para ser usadas en la route profesional */
module.exports= 
    {
        crearProfesional,
        obtenerProfesional,
        modificarProfesional,
        eliminarProfesional
    };