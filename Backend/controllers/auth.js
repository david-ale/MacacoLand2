const express = require('express');

const signUp = (req,res = express.request) => {
    res.json({
        ok: true
    })
}

const login = (req,res = express.request) => {
    res.json({
        ok: true
    })
}

const profile = (req,res = express.request) => {
    res.json ({
        ok: true
    })
}

const revalidarToken = (req,res = express.request) => {
    res.json({
        ok: true
    })
}

module.exports = {
    signUp,
    login,
    revalidarToken
}