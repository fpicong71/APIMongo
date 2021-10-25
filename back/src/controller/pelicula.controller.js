/* Importo el modelo. 
En este caso el modelo de user */
const Pelicula = require("../model/Pelicula");
const Profesional = require("../model/Profesional")

/* METODOS DE PELICULA */
/* ******************* */

/* GET - obtenerPelicula -> 
Obtiene todas las peliculas, si no hay id.
Si hay id, devuelve la información de esa película */
const obtenerPelicula = async(req,res,next) =>
{
    /* Recojo el id del cuerpo de la petición */
    const{_id} = req.body;

    if(_id)
    {
        /* Tengo id. Obtengo la pelicula con ese id */
        try
        {
            await Pelicula.findById(_id).exec()
            .then( result =>
                {
                    res.status(200).json(
                        {
                            body:       result,
                            message:    "Película con id: " 
                                        + _id + " encontrada"
                        });
                })
            .catch( err =>
                {
                    console.log("Error al obtener la pelicula con id: " 
                        + _id);
                    next(err); 
                });

        }
        catch(err)
        {
            console.log("Error al intentar obtener la pelicula con id: " 
                + _id);
            next(err);
        }
    }
    else
    {
        /* No tengo id. Obtengo todas las peliculas */
        try
        {
            await Pelicula.find().exec()
            .then( result =>
                {
                    res.status(200).json(
                        {
                            body:       result,
                            message:    "Películas encontradas"
                        });
                })
            .catch( err =>
                {
                    console.log("Error al obtener las peliculas");
                    next(err); 
                });

        }
        catch(err)
        {
            console.log("Error al intentar obtener las peliculas");
            next(err);
        }
    }
}

/* GET - actoresPelicula ->
Paso el id de la pelicula y devuelve la info de los actores */
const actoresPelicula = async(req,res,next) =>
{
    const{_id} = req.body;

    if(_id)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            Pelicula.findById(_id).populate("actores").exec()
            .then( result =>
                {
                    let mensaje = "Película encontrada.\n" +
                            "Id: " + _id + 
                            " - Titulo:" + result.titulo + "\n"
                            + "Actores : "

                    for(let actor in result.actores)
                    {
                        mensaje += "- " + result.actores[actor].nombre + "\n"
                    }

                    res.status(200).json(
                        {
                            body    :   result,
                            message :   mensaje
                        });

                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar mostrar la película y sus actores");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula,IMPOSIBLE mostrar actores");
        next(err);
    }
}

/* GET - directoresPelicula ->
Paso el id de la pelicula y devuelve la info de los directores */
const directoresPelicula = async(req,res,next) =>
{
    const{_id} = req.body;

    if(_id)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            Pelicula.findById(_id).populate("directores").exec()
            .then( result =>
                {
                    let mensaje = "Película encontrada.\n" +
                            "Id: " + _id + 
                            " - Titulo:" + result.titulo + "\n"
                            + "Directores : "

                    for(let dir in result.directores)
                    {
                        mensaje += "- " + result.directores[dir].nombre + "\n"
                    }

                    res.status(200).json(
                        {
                            body    :   result,
                            message :   mensaje
                        });

                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar mostrar la película y sus directores");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula,IMPOSIBLE mostrar directores");
        next(err);
    }
}

/* GET - guionistasPelicula ->
Paso el id de la pelicula y devuelve la info de los guionistas */
const guionistasPelicula = async(req,res,next) =>
{
    const{_id} = req.body;

    if(_id)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            Pelicula.findById(_id).populate("guionistas").exec()
            .then( result =>
                {
                    let mensaje = "Película encontrada.\n" +
                            "Id: " + _id + 
                            " - Titulo:" + result.titulo + "\n"
                            + "Guionistas : "

                    for(let gui in result.guionistas)
                    {
                        mensaje += "- " + result.guionistas[gui].nombre + "\n"
                    }

                    res.status(200).json(
                        {
                            body    :   result,
                            message :   mensaje
                        });

                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar mostrar la película y sus guionistas");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula,IMPOSIBLE mostrar guionistas");
        next(err);
    }
}

/* GET - productoraPelicula ->
Paso el id de la pelicula y devuelve la info de los productores */
const productoraPelicula = async(req,res,next) =>
{
    const{_id} = req.body;

    if(_id)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            Pelicula.findById(_id).populate("productores").exec()
            .then( result =>
                {
                    let mensaje = "Película encontrada.\n" +
                            "Id: " + _id + 
                            " - Titulo:" + result.titulo + "\n"
                            + "Productores : "

                    for(let pro in result.productores)
                    {
                        mensaje += "- " + result.productores[pro].nombre + "\n"
                    }

                    res.status(200).json(
                        {
                            body    :   result,
                            message :   mensaje
                        });

                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar mostrar la película y sus productores");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula,IMPOSIBLE mostrar productores");
        next(err);
    }
}

/* POST - crearPelicula -> 
Añade una nueva pelicula a la lista de profesionales */
const crearPelicula = async(req,res,next) =>
{
    try
    {
        /* Intento crear una pelicula */

        /* Recojo del request los valores de los campos para crear el documento */
        const {cartel,titulo,anio,genero,nacionalidad,actores,directores,guionistas,productores,sinopsis} = req.body;

        /* doc recoge todos los valores pasados en la request para crear un documento */
        let doc = new Pelicula({
            "cartel"        :   cartel,
            "titulo"        :   titulo,
            "anio"          :   anio,
            "genero"        :   genero,
            "nacionalidad"  :   nacionalidad,
            "actores"       :   actores,
            "directores"    :   directores,
            "guionistas"    :   guionistas,
            "productores"   :   productores,
            "sinopsis"      :   sinopsis
        })

        /* Creo el nuevo documento */
        await doc.save()
        .then( result =>
            {
                res.status(200).json(
                    {
                        body:       result,
                        message:    "Película añadida"
                    });
            })
        .catch(err=>
            {
                /* Se ha producido un error al crear el profesional */
                console.log("Error al intentar hacer insert de la nueva película - " + err);
                throw err;
            });
    }
    catch(err)
    {
        /* Se ha producido un error al crear el profesional */
        console.log("Error al intentar hacer POST de la nueva película");
        next(err);
    }
}

/* POST - aniadirActor ->
Añade un nuevo actor a la lista de actores de una película*/
const aniadirActor = async (req,res,next) =>
{
    /* Recojo el id de la pelicula, y 
    el id del actor a añadir del body de la petición */
    const {_id,actor} = req.body;

    if(_id && actor)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            /* El modificador de mongo $addToSet añade un elemento
            a un array si este no existe ya */
            Pelicula.updateOne({"_id":_id},{$addToSet:{"actores":actor}}).exec()
            .then( result =>
                {
                    res.status(200).json(
                        {
                            body    :   result,
                            message :   "Añadido actor con id " + actor + 
                                " a la película"
                        });               
                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar añadir actor a  la película.");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula o id actor,IMPOSIBLE añadir actor");
        next(err);
    }
   


}

/* POST - aniadirDirector ->
Añade un nuevo director a la lista de actores de una película*/
const aniadirDirector = async (req,res,next) =>
{
    /* Recojo el id de la pelicula, y 
    el id del director a añadir del body de la petición */
    const {_id,director} = req.body;

    if(_id && director)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            /* El modificador de mongo $addToSet añade un elemento
            a un array si este no existe ya */
            Pelicula.updateOne({"_id":_id},{$addToSet:{"directores":director}}).exec()
            .then( result =>
                {
                    res.status(200).json(
                        {
                            body    :   result,
                            message :   "Añadido director con id " + director + 
                                " a la película"
                        });               
                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar añadir director a  la película.");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula o id director,IMPOSIBLE añadir director");
        next(err);
    }
}

/* POST - aniadirGuionita ->
Añade un nuevo director a la lista de actores de una película*/
const aniadirGuionista = async (req,res,next) =>
{
    /* Recojo el id de la pelicula, y 
    el id del guionista a añadir del body de la petición */
    const {_id,guionista} = req.body;

    if(_id && guionista)
    {
        /* Tengo _id, puedo realizar la consulta */
        try
        {
            /* Intento hacer la consulta a la BD */
            /* El modificador de mongo $addToSet añade un elemento
            a un array si este no existe ya */
            Pelicula.updateOne({"_id":_id},{$addToSet:{"guionistas":guionista}}).exec()
            .then( result =>
                {
                    res.status(200).json(
                        {
                            body    :   result,
                            message :   "Añadido guionista con id " + guionista + 
                                " a la película"
                        });               
                })
            .catch( err =>
                {
                    /* El intento de consulta a la BD no ha tenido exito */
                    console.log("Error al consultar la pelicula en la DB");
                    next(err);
                });
        }
        catch(err)
        {
            /* Se produce un error al buscar la pelicula en la BD */
            console.log("Error al intentar añadir guionista a  la película.");
            next(err);
        }
    }
    else
    {
        /* No tengo _id de pelicula, no puedo consultar la BD */
        console.log("No hay id de pelicula o id guionista, IMPOSIBLE añadir guionista");
        next(err);
    }
}

/* PUT - modificarPelicula ->
Actualiza los datos de una pelicula*/
const modificarPelicula = async(req,res,next) =>
{
    /* Recojo los posibles valores a modificar
    del cuerpo de la petición */
    const {
        _id,
        cartel,
        titulo,
        anio,
        genero,
        nacionalidad,
        actores,
        directores,
        guionistas,
        productores,
        sinopsis
    } = req.body;

    let aModificar =
    {
        "cartel"        :   cartel,
        "titulo"        :   titulo,
        "anio"          :   anio,
        "genero"        :   genero,
        "nacionalidad"  :   nacionalidad,
        "actores"       :   actores,
        "directores"    :   directores,
        "guionistas"    :   guionistas,
        "productores"   :   productores,
        "sinopsis"      :   sinopsis
    }

    let longModificar = 0;
    /* Recorro el Json a modificar para comprobar 
    cuando elementos están rellenos, y cuales vacios.
    Si está lleno entonces se incrementa longModificar */
    for(let clave in aModificar)
    {
        if(aModificar[clave])
        {          
            longModificar++;
        } 
    }

    console.log("Longitud de amodificar:" + longModificar );

    /* Pelicula.updateOne({_id:_id},{"titulo":titulo, "anio":anio, "genero":genero, "nacionalidad":nacionalidad,"actores":actores,"directores":directores,"guionistas":guionistas,"productores":productores, "sinopsis":sinopsis}) */
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
                    if( clave == "genero" || clave == "actores" ||
                        clave == "directores" || clave == "guionistas" ||
                        clave == "productores" )
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
                    if( clave == "genero" || clave == "actores" ||
                        clave == "directores" || clave == "guionistas" ||
                        clave == "productores" )
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

        console.log(query);

        /* Como query es una cadena y necesito un json,
        lo parseo */
        query = JSON.parse(query);

        try
        {
            /* Intento actualizar el profesional */
            await Pelicula.updateOne({_id:_id},query,{'multi':true}).exec()
            .then( result =>
                {
                    /* Tengo exito en la consulta a la BD, modifica el documento.
                    Configuro la respuesta */
                    res.status(200).json(
                        {
                            body:       result,
                            message:    "Película modificada "
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
            console.log("Error al intentar actualizar la película con id: " + _id)
            throw err;
        }
    }
    else
    {
        /* No tengo id */
        console.log("No es posible modificar sin el id de la pelicula")
        next(err);
    }
} 

/* DELETE - eliminarPelicula ->
Elimina la pelicula que pasamos por id*/
const eliminarPelicula = async(req,res,next) =>
{
    /* Recojo el id de la pelicula a 
    través del cuerpo de la petición */
    const {_id} = req.body;

    if(_id)
    {
        /* Tengo id de pelicula */
        try
        {
            await Pelicula.deleteOne({_id:_id}).exec()
            .then( result=>
                { 
                    res.status(200).json(
                    {
                        body:       result,
                        message:    "Pelicula Eliminada "
                    });

                })
            .catch( err =>
                {
                    console.log("Error al eliminar película");
                    throw err;
                });

        }
        catch (err)
        {
            console.log("Error al intentar eliminar película en la BD");
            next(err);
        }
    }
    else
    {
        /* No tengo id de pelicula */
        console.log("IMPOSIBLE eliminar película sin id");
        next(err);
    }

}

/* DELETE - eliminarActor ->
Elimina el actor de la película que pasamos por id*/
const eliminarActor = async(req,res,next) =>
{
    /* Recojo el id de la pelicula a 
    través del cuerpo de la petición */
    const {_id,actor} = req.body;

    if(_id && actor)
    {
        /* Tengo id de pelicula */
        try
        {
            await Pelicula.updateOne({"_id":_id},{$pull:{"actores":actor}}).exec()
            .then( result=>
                { 
                    res.status(200).json(
                    {
                        body:       result,
                        message:    "Actor " + actor + " eliminado de la película "
                    });

                })
            .catch( err =>
                {
                    console.log("Error al eliminar actor");
                    throw err;
                });

        }
        catch (err)
        {
            console.log("Error al intentar eliminar actor de la película en la BD");
            next(err);
        }
    }
    else
    {
        /* No tengo id de pelicula */
        console.log("IMPOSIBLE eliminar actor sin id de pelicula y id de actor");
        next(err);
    }

}

/* DELETE - eliminarDirector ->
Elimina el director de la película que pasamos por id*/
const eliminarDirector = async(req,res,next) =>
{
    /* Recojo el id de la pelicula a 
    través del cuerpo de la petición */
    const {_id,director} = req.body;

    if(_id && director)
    {
        /* Tengo id de pelicula */
        try
        {
            await Pelicula.updateOne({"_id":_id},{$pull:{"directores":director}}).exec()
            .then( result=>
                { 
                    res.status(200).json(
                    {
                        body:       result,
                        message:    "Director " + director + " eliminado de la película "
                    });

                })
            .catch( err =>
                {
                    console.log("Error al eliminar director");
                    throw err;
                });

        }
        catch (err)
        {
            console.log("Error al intentar eliminar director de la película en la BD");
            next(err);
        }
    }
    else
    {
        /* No tengo id de pelicula */
        console.log("IMPOSIBLE eliminar director sin id de pelicula y id de director");
        next(err);
    }
}

/* DELETE - eliminarGuionista ->
Elimina el guionista de la pelicula que pasamos por id*/
const eliminarGuionista = async(req,res,next) =>
{
    /* Recojo el id de la pelicula a 
    través del cuerpo de la petición */
    const {_id,guionista} = req.body;

    if(_id && guionista)
    {
        /* Tengo id de pelicula */
        try
        {
            await Pelicula.updateOne({"_id":_id},{$pull:{"guionistas":guionista}}).exec()
            .then( result=>
                { 
                    res.status(200).json(
                    {
                        body:       result,
                        message:    "Guionista " + guionista + " eliminado de la película "
                    });

                })
            .catch( err =>
                {
                    console.log("Error al eliminar guionista");
                    throw err;
                });

        }
        catch (err)
        {
            console.log("Error al intentar eliminar guionista de la película en la BD");
            next(err);
        }
    }
    else
    {
        /* No tengo id de pelicula */
        console.log("IMPOSIBLE eliminar guionista sin id de pelicula y id de guionista");
        next(err);
    }
}




/* Exporto las funciones para ser usadas en la route user */
module.exports= 
    {
        crearPelicula,
        obtenerPelicula,
        actoresPelicula,
        directoresPelicula,
        guionistasPelicula,
        productoraPelicula,
        aniadirActor,
        aniadirDirector,
        aniadirGuionista,
        modificarPelicula,
        eliminarPelicula,
        eliminarActor,
        eliminarDirector,
        eliminarGuionista
    };