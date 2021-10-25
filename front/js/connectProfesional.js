window.onload = cargarEventos;

// Cargar escuchadores
// *******************
function cargarEventos(){
    document.getElementById("btn-mostrar").addEventListener("click", obtenerProfesional,false);

    document.getElementById("btn-crear").addEventListener("click", crearProfesional,false);

    document.getElementById("btn-actualizar").addEventListener("click", modificarProfesional,false);

    document.getElementById("btn-eliminar").addEventListener("click", eliminarProfesional,false);
}

/* CLASE PROFESIONAL */
/* ***************** */

class Profesional
{
    constructor(_id,foto,nombre,edad,nacionalidad,oscars,profesion,bio,peliculas)
    {
        this._id = _id;
        this.foto = foto;
        this.nombre = nombre;
        this.edad = edad;
        this.nacionalidad = nacionalidad;
        this.oscars = oscars;
        this.profesion = profesion;
        this.bio = bio;
        this.peliculas = peliculas;
    }
}

/* Creo un nuevo objeto prolfesional */
let profesional = new Profesional (null,null,null,null,null,null,null,null,null);

/* DOM */
/* *** */
/* Creo un article en el HTML, que recogerá los resultados de las consultas y los mensajes
Será necesario append(), cuando lo quiera añadir */
let tag = document.createElement("article");

/* createCard creará un card con los datos devueltos por la API, y lo inserta dentro del article. */
function createCard(indice,item)
{
    let card = null;
    card = 
    "<div class='col-xs-10 col-sm-6 col-md-3 col-lg-2 mx-1 my-2 align-self-stretch' id='r"+ item._id + "'>"+
    "<div class='card p-0'>" +
    "<img src='" + item.foto + "' class='card-img-top' alt='" + item.nombre + "'>"+
    "<h5 class='card-title'>Id Profesional <span class='d-block'>"+item._id+"</span></h5>"+
    "<div class='card-body'>" +
    "<dl class='p3'>" +
        "<dt>Nombre</dt>"  +
        "<dd id='r_nombre"+ indice + "'>" + item.nombre + "</dd>" +
        "<dt>Edad</dt>" +
        "<dd id='r_edad"+ indice + "'>" + item.edad + "</dd>" +
        "<dt>Nacionaloidad</dt>" +
        "<dd id='r_nacionalidad"+ indice + "'>" + item.nacionalidad + "</dd>" +
        "<dt>Oscar</dt>" +
        "<dd id='r_oscars"+ indice + "'>" + item.oscars + "</dd>" +
        "<dt>Profesión</dt>" +
        "<dd id='r_profesion"+ indice + "'>" + item.profesion + "</dd>" +
        "<dt>Bio</dt>" +
        "<dd id='r_bio"+ indice + "'>" + item.bio + "</dd>" +
        "<dt>Peliculas</dt>" +
        "<dd id='r_peliculas"+ indice + "'>" + getFilmsProfesional(item.peliculas) + "</dd>" +
    "</dl>" +
    "</div></div></div>" ;
    return card;
}

/* createCard creará una card con los datos devueltos por la API, y lo inserta dentro del article. */
function createOneCard(item)
{
    let card = null;
    console.log("src :" + item.foto);
    card = 
    "<div class='col-xs-8 col-sm-4 mx-auto my-2 align-self-stretch' id='r"+ item._id + "'>"+
    "<div class='card p-0'>" +
    "<img src='" + item.foto + "' class='card-img-top' alt='" + item.nombre + "'>"+
    "<h5 class='card-title'>Id Profesional <span class='d-block'>"+item._id+"</span></h5>"+
    "<div class='card-body'>" +
    "<dl class='p3'>" +
        "<dt>Nombre</dt>"  +
        "<dd id='r_nombre" + "'>" + item.nombre + "</dd>" +
        "<dt>Edad</dt>" +
        "<dd id='r_edad"+ "'>" + item.edad + "</dd>" +
        "<dt>Nacionaloidad</dt>" +
        "<dd id='r_nacionalidad"+  "'>" + item.nacionalidad + "</dd>" +
        "<dt>Oscar</dt>" +
        "<dd id='r_oscars"+  "'>" + item.oscars + "</dd>" +
        "<dt>Profesión</dt>" +
        "<dd id='r_profesion"+  "'>" + item.profesion + "</dd>" +
        "<dt>Bio</dt>" +
        "<dd id='r_bio"+  "'>" + item.bio + "</dd>" +
        "<dt>Peliculas</dt>" +
        "<dd id='r_peliculas"+  "'>" + getFilmsProfesional(item.peliculas) + "</dd>" +
    "</dl>" +
    "</div></div></div>" ;
    return card;
}

/* Función para recorrer las peliculas y poder mostrarlas */
function getFilmsProfesional(objeto)
{
    let peliculasProf = "";
    for(let film in objeto)
    {
        peliculasProf += objeto[film].titulo + " - "    
    }
    return peliculasProf;
}

/* Resetea las respuestas cada vez que pulso un botón */
function reset()
{
    let articulo = (document.getElementsByTagName("article"))[0];
    document.getElementById("resultados").removeChild(articulo);
}

/* Para crear mensajes */
function crearResultado()
{
    /*Añado al documento, al elemento con Id "resultados", el article que recogerá los resultados devueltos */
    document.getElementById("resultados").append(tag);


    /* Selecciono los article del documento */
    let mArticle = document.getElementsByTagName('article');

    /* Solo tengo un articulo. Por eso es [0].
    Le agrego clases */
    mArticle[0].classList.add("d-flex", "flex-row","justify-content-center", "align-items-center", "flex-wrap", "w-100","text-dark");

    return mArticle[0];
}

// METODOS COMUNICACION CON API
// ****************************
//Motrar profesional GET
async function obtenerProfesional()
{
    /* Compruebo si existe el <article> que recoge los resultados.
    Si existe hago removeChild, eliminandolo del DOM, invocando a reset() */
    let comprobarArticle = document.getElementsByTagName('article');   
    if(comprobarArticle[0]) reset();

    /* Recojo el valor del id del formulario */
    let id = document.getElementById("profesional_id").value;

    console.log("El id-> " + id);

    /* Url con la que conectaré */
    let url = null;

    /* Configuración de la petición a la API */
    let param =
    {
        headers: {"Content-type":"application/json; charset-utf8"},
        method: "GET"
    }

    /* Si tengo id tengo una endpoint con id, si no otro para que devuelva todos */
    if(id) url = "http://localhost:3000/profesionales?id=" + id;
    else url = "http://localhost:3000/profesionales";

    /* Conexión con la API */
    try
    {
        /* contestación aguarda la recuperación de datos de la API. Pasamos el endpoint y contenido */
        let contestacion = await fetch(url,param);

        /*result recoje la contestación de la API pasandola a json */
        let result = await contestacion.json();

        /*miCard guardara un string con el código html a inyectar en index.html */
        let miCard = "";

        if(id)
        {
            // for (let k in result.body)
            // {
            //     console.log( k + " : " + result.body[k]);
            // }
            miCard += createOneCard(result.body);
        }
        else
        {
            let  mResult = result.body;
            /* Por cada elemento(registro) que trae result, creo un card incovanco a createCard con el indice y el objeto del que tiene que extraer los datos(mitem) */
            mResult.forEach((value,index) =>
            {
                let mitem = mResult[index];

                miCard += createCard(index,mitem);
            });
        }
            let item = crearResultado();
            item.innerHTML = miCard;
    }
    catch(error)
    {
        /* Se produce un error al consultar la API */
        console.log(error + "-> Al traer los datos - FRONT");
        let item = crearResultado();
        item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>" + error + " - Al traer los datos</p></div>";
    }
} 

//Motrar profesional POST
async function crearProfesional()
{
    /* Compruebo si existe el <article> que recoge los resultados.
    Si existe hago removeChild, eliminandolo del DOM, invocando a reset() */
    let comprobarArticle = document.getElementsByTagName('article');   
    if(comprobarArticle[0]) reset();

    /* Conecto con la API */
    try
    {
        /* Recojo los valores del formulario y los asigno a los atributos de un objeto Student creado al principio, que se llama profesional */
        profesional.nombre =
            document.getElementById("nombre").value;
        profesional.edad =
            document.getElementById("edad").value;
        profesional.nacionalidad =
            document.getElementById("nacionalidad").value;
        profesional.oscars =
            document.getElementById("oscars").value;

        /* El input recoge una cadena, pero en la DB se guarda como array
        por eso tengo que utilizar el método de los string split, que pasando
        un separador parte la cadena en elementos de un array.
        Igual pasa con peliculas */
        let stringProfesion = document.getElementById("profesion").value;
        profesional.profesion = stringProfesion.split(',');
            
        profesional.bio =
            document.getElementById("bio").value;

        let stringPeliculas = document.getElementById("peliculas").value;
        profesional.peliculas = stringPeliculas.split(',');
            
        profesional.foto =
            document.getElementById("foto").value;

        /* Url enpoint de la url */
        let url = "http://localhost:3000/profesionales";

        /* Configuro la petición, lo que voy a enviar a la API */
        let param = 
        {
            headers: 
                {"Content-type":"application/json; charset=UTF-8"},
            body: JSON.stringify(profesional),
            method: "POST"
        };

        /* pet2Insert aguarda a recoger la respuesta de la API */
        let pet2Insert = await fetch(url,param);

        /* Result guarda la contestación de la API */
        let result = await pet2Insert.json();

        /* El result devuelve el id insertado */
        console.log("profesional insertado: " + result.body._id);

        /* Creo articulo para mostrar mensaje informativo de la operación */
        let item = crearResultado();
        item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>profesional insertado, con id: " + result.body._id +" </p></div>"
        
    }
    catch(error)
    {
        /* Error al conectar con la API */
        console.log(error + "Error en front al hacer post");

        /* Creo articulo para mostrar mensaje informativo de la operación:Error */
        let item = crearResultado();
        item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>"+ error + "Error en front al hacer post" + " </p></div>"
    }

}

// Modificar profesional PUT
async function modificarProfesional()
{
    /* Compruebo si existe el <article> que recoge los resultados.
    Si existe hago removeChild, eliminandolo del DOM, invocando a reset() */
    let comprobarArticle = document.getElementsByTagName('article');   
    if(comprobarArticle[0]) reset();

    /* Recojo el profesional_id del formulario */
    let id2Update = document.getElementById("profesional_id").value;
    console.log(id2Update);

    let url = null;

    /* Compruebo si hay id o no */
    if(id2Update)
    {
        /* Hay id
        Asigno valor a la url que será el end point de la API */
        url = "http://localhost:3000/profesionales?id=" + id2Update;

        /* Trato de conectar con la API */
        try
        {
            /* Asigno los valores recogidos en el formulario al los atributos del objeto Student(profesional), siempre que no sean nulos. Si son nulos, le asigno el valor null */
            profesional.foto =
            (document.getElementById("foto").value!=null)
            ?document.getElementById("foto").value
            :null;
            profesional._id = 
                (document.getElementById("profesional_id").value != null) 
                ? document.getElementById("profesional_id").value 
                : null;
            profesional.nombre =
                (document.getElementById("nombre").value!=null) 
                ?document.getElementById("nombre").value
                :null;
            profesional.edad =
                (document.getElementById("edad").value!=null)
                ? document.getElementById("edad").value
                :null;
            profesional.nacionalidad =
                (document.getElementById("nacionalidad").value!=null)
                ?document.getElementById("nacionalidad").value
                : null;
            profesional.oscars =
                (document.getElementById("oscars").value!=null)
                ?document.getElementById("oscars").value
                :null;
            profesional.profesion =
                (document.getElementById("profesion").value!=null)
                ?document.getElementById("profesion").value
                :null;
            profesional.bio =
                (document.getElementById("bio").value!=null)
                ?document.getElementById("bio").value
                :null;
            profesional.peliculas =
                (document.getElementById("peliculas").value!=null)
                ?document.getElementById("peliculas").value
                :null;
    
            console.log("profesional tras recoger datos-> ");
            console.log( profesional);
            
            /* Configuro el mensaje a enviar a la API
            Le mando como cuerpo del mensaje el objeto student profesional */
            let param = 
            {
                headers: 
                    {"Content-type":"application/json; charset=UTF-8"},
                body: JSON.stringify(profesional),
                method: "PUT"
            }
    
            console.log("Param.body-> " + param.body);
    
            /* Guardo en data2Update el resultado recuperado de la API */
            let data2Update = await fetch(url,param);
    
            let result = await data2Update.json();
            console.log("Profesional modificado");

            /* Creo articulo para que muestre el resultado */
            let item = crearResultado();
            item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>profesional modificado, con id: " + id2Update +" </p></div>"

        }
        catch (error)
        {
            /* Error al intentar hacer recoger de la API */
            console.log(error + "Error al modificar");

            /* Creo articulo para que muestre el resultado */
            let item = crearResultado();
            item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>Error al modificar: " + error +" </p></div>"
            
        }
    } 
    else
    {
        /* No tenemos Id válido */
        console.log("Imposible modificar. No hay Id");

        /* Creo articulo para que muestre el resultado */   
        let item = crearResultado();
        item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>Imposible modificar. No hay Id</p></div>"

    }     
}

//Modificar profesional DELETE
async function eliminarProfesional()
{
     /* Compruebo si existe el <article> que recoge los resultados.
    Si existe hago removeChild, eliminandolo del DOM, invocando a reset() */
    let comprobarArticle = document.getElementsByTagName('article');   
    if(comprobarArticle[0]) reset();

    /* Recojo el valor del id en el formulario */
    let idEliminar = document.getElementById("profesional_id").value;

    console.log("Id a eliminar: " + idEliminar);

    /* Compruebo si tengo id o no */
    if(idEliminar)
    {
        /* Tengo id */
        /* Este id lo pasaré como body del mensaje a la API */
        let id = {"_id": idEliminar};

        /* Asigno a url el valor que tiene la endpoint de la API */
        url = "http://localhost:3000/profesionales?id=" + idEliminar;

        console.log("url ->" + url);


        /* Trato de conectar con la API */
        try
        {
            /* Configuro mensaje para la API */
            let param = 
            {
                headers: 
                    {"Content-type":"application/json; charset=UTF-8"},
                body: JSON.stringify(id),
                method: "DELETE"
            }

            /* Guardo los datos recuperados de la API */
            let datoEliminar = await fetch(url,param);
            let result = await datoEliminar.json();

            console.log("Registro eliminado");

            /* Creo articulo para que muestre el resultado */   
            let item = crearResultado();
            item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>profesional eliminado, con id: " + idEliminar +" </p></div>"

        }
        catch(error)
        {
            console.log(error + "Error al eliminar");

            /* Creo articulo para que muestre el resultado */   
            let item = crearResultado();
            item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>Error al eliminar" + error +" </p></div>"

        }
    }
    else
    {   /* No tengo un ID valido */
        console.log("Imposible eliminar. No hay Id");

        /* Creo articulo para que muestre el resultado */   
        let item = crearResultado();
        item.innerHTML = "<div class='d-flex justify-content-center align-items-center text-dark text-uppercase fw-bold'><p>Imposible eliminar sin Id </p></div>"

    }

}