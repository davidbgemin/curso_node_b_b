const {response} = require('express');

const esAdminRole = (req, res=response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    // usuario de la sgte línea se creó en base al uid que venía en el jwt
    const {role, nombre} = req.usuario;
    if (role!=='ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador - No puede hacer esto`
        })
    }
    next()
}


const tieneRole = (...roles) => {
    
    return (req, res=response, next) => {
        // console.log(roles, req.usuario.role); // [ 'ADMIN_ROLE', 'VENTAS_ROLE' ] ADMIN_ROLE

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El usuario ${req.usuario.nombre} no tiene el rol ${req.usuario.role} - No puede hacer esto`
            })
        }
        
        next();
    }
}

module.exports = {
    esAdminRole, tieneRole
}