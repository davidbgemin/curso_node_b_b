const {validationResult} = require('express-validator');


const validarCampos = (req, res, next) => {
    // validación de correo electrónico (validationResult es lo que viene del user.routes):
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // si hay errores, retornar un error 400:
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {
    validarCampos
}