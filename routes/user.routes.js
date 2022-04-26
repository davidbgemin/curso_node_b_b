const {Router} = require('express');
const {check} = require('express-validator');

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller');
const { validarCampos } = require('../middleware/validar-campos');
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
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserPorId),
    validarCampos
],userDelete);

router.patch("/", userPatch);


module.exports = router;