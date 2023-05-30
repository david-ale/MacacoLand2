const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')
const {validarJWT} = require('../middlewares/validar-token')

const signUp = async (req,res = express.request) => {
    const {nombre, email, contraseña} = req.body
    try{
        let usuario = await Usuario.findOne({email:email})
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Ya hay un usuario con este correo'
            })
        }

        usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.contraseña = bcrypt.hashSync(contraseña,salt);
        await usuario.save();

        return res.status(200).json({
            ok: true,
            usuario
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            error
        })
    }

}

const login = async (req,res = express.request) => {
    const {email, contraseña} = req.body

    try{
        let usuario = await Usuario.findOne({email:email})
        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario no extiste'
            })
        }
        const validarContraseña = bcrypt.compareSync(contraseña, usuario.contraseña);
        if (!validarContraseña){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })
        }

        const token = await(generarJWT(usuario.id,usuario.nombre))

        return res.status(200).json({
            ok: true,
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            error
        })
    }
}

const profile = async (req,res = express.request) => {
    //Acceso a lo que seria el perfil del usuario en fronend
    const {nombre,email,contraseña} = req.body;
    res.json ({
        ok: true,
        msg:`Esto es la pagina de perfil de ${nombre} `
    })
}

const index = async (req,res = express.request) =>{
    
    //Acceso a lo que seria el menu principal del usuario en frontend
    const {nombre,email,contraseña} = req.body;
    res.json({
        ok: true,
        msg:`Esto es la pagina de perfil de ${nombre} `
    })
}

const revalidarToken = async (req,res = express.request) => {
    const {uid,name} = req
    const token = await(generarJWT(uid,name))

    return res.json({
        ok: true,
        token
    })
}

module.exports = {
    signUp,
    login,
    profile,
    index,
    revalidarToken
}