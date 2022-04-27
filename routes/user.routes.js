const {Router} = require('express');
const {check} = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middleware')

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');
const { esRoleValido, emailExiste, existeUserPorId } = require('../helpers/db-validators');

const router = Router();


router.get("/", userGet);

router.put("/:id", [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserPorId),
    check('role').custom(esRoleValido),

    validarCampos
], userPut);

router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    
    check('role').custom(esRoleValido),
    
    validarCampos
], userPost);

router.delete("/:id", [
    validarJWT,
    // esAdminRole, // este middleware fuerza a que el usuario tenga el rol de admin
    tieneRole('ADMIN_ROLE', 'USER_ROLE'), // este middleware indica que lo que se recibe tiene que ser o ADMIN_ROLE o USER_ROLE
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserPorId),
    validarCampos
],userDelete);

router.patch("/", userPatch);


module.exports = router;