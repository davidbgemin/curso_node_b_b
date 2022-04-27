const { response, request } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user')


const userGet = async (req=request, res=response) => {
    const {limite=5, desde=0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.count(query), // total
        Usuario.find(query) // usuarios
            // postman: localhost:8080/api/usuarios?desde=5&limite=10
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const userPut = async (req, res) => {

    const {id} = req.params;
    const { _id, password, google, correo, ... resto } = req.body

    if ( password ) {
        // encriptar la constraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(400).json({
        usuario
    });
}

const userPost = async (req, res=response) => {


    // extrayendo el body
    const { nombre, correo, password, role } = req.body;
    // instanciación del modelo (clase) usuario
    const usuario = new Usuario({nombre, correo, password, role});

    // encriptar la constraseña
    //                    salt (cantidad de vueltas para hacer más segura la encriptación, por defecto es 10)
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardando la instancia creada:
    await usuario.save();

    res.status(201).json({
        usuario,
    });
}

const userDelete = async (req, res=response) => {
    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({usuario, /* usuarioAutenticado */})

}

const userPatch = (req, res) => {
    res.json({
        mensaje: "patch API - controlador"
    });
}

module.exports = {
    userGet, userPut, userPost, userDelete, userPatch
}