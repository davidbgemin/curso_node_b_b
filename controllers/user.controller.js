const { response, request } = require('express')


const userGet = (req=request, res=response) => {
    // 1: enviar en postman: http://localhost:8080/api/usuarios (get)
    // res.json({
    //     mensaje: "get API - controlador"
    // });
    // postman retorna lo que está en el mensaje (2 líneas arriba)

    // 2a: enviar en postman http://localhost:8080/api/usuarios?q=hola&nombre=david&apikey=12341 (get):
    const {q, nombre, apikey, pais='Sin país'} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        pais
    })
    // postman retorna:el msg mas el query que es lo que está en el link (:2a):
/*     {
        "msg": "get API - controlador",
        "q": "hola",
        "nombre": "david",
        "apikey": "12341",
        "pais": "Sin país"
    } */
}

const userPut = (req, res) => {
    // enviar en postman: http://localhost:8080/api/usuarios/10 (put) (necesariamente tiene que enviarse el /10 que es el id):

    const {id} = req.params;
    res.status(400).json({
        mensaje: "put API - controlador",
        id
    });
    /* postman devuelve:
    {
        "mensaje": "put API - controlador",
        "id": "10"
    }
    */
}

const userPost = (req, res) => {
    // enviar en postman: http://localhost:8080/api/usuarios (post): 
    /* 
    {
        "nombre": "David",
        "edad": 28,
        "id": 1,
        "apellido": "Baila"
    }
     */

    // solo recibe lo que se especifica aquí:
    const {nombre, edad} = req.body;

    res.status(201).json({
        mensaje: "post API - controlador",
        nombre,
        edad,
    });

    /* postman devuelve:
    {
        "mensaje": "post API - controlador",
        "nombre": "David",
        "edad": 28
    }
     */
}

const userDelete = (req, res) => {
    res.json({
        mensaje: "delete API - controlador"
    });
}

const userPatch = (req, res) => {
    res.json({
        mensaje: "patch API - controlador"
    });
}

module.exports = {
    userGet, userPut, userPost, userDelete, userPatch
}