const express = require('express');
const router = express.Router();
const {signUp,login,profile,index,revalidarToken} = require('../controllers/auth');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-token');
const {validarCampos} = require('../middlewares/validar-campos');

router.post('/Signup',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('contraseña',).isLength({min:6}),
        validarCampos
    ],
    signUp)

router.post('/login',
    [
        check('email','Debe poner su email para iniciar sesion').isEmail(),
        check('contraseña',).isLength({min:6}),
        validarCampos
    ],
    login)

router.get('/index',index)
router.get('/Profile',profile)
router.get('/renew',revalidarToken,validarJWT)


module.exports = router;