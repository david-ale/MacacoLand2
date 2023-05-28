const express = require('express');
const router = express.Router();
const {signUp,login,revalidarToken} = require('../controllers/auth');
const {check} = require('express-validator');

router.post('/Signup',signUp)
router.post('/login',login)
router.get('/renew',revalidarToken)


module