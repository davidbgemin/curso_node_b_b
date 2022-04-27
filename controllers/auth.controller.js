const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res=response) => {

    const { correo, password } = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - correo'
            })
        }

        // verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/contraseña incorrectos - estado: false'
            })
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/contraseña incorrectos - password'
            })
        }

        // generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            msg: 'Algo salió mal, intenta de nuevo',
        })
    }


}

module.exports = {
    login
}