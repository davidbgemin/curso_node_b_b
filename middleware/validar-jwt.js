const { response, request } = require('express');
const jwt = require('jsonwebtoken')

const Usuario = require('../models/user')

const validarJWT = async (req=request, res=response, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        // uid viene del payload del token: const payload = jwt.verify(token, process.env.JWT_SECRET); console.log(payload);
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        // varificar si el usuario no existe:
        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe - usuario no existe en bd'
            })
        }

        // verificar si el uid tiene estado en true: (si está en true, sí puede eliminar usuario, sino muestra el mensaje de error - 401)
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido: usuario con estado en false'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}