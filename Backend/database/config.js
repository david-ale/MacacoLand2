const mongoose = require('mongoose');
const dbConnection = async () => {
    try{
        mongoose.connect(process.env.DATABASE_CONNECTION, {
            autoIndex: true
        })
        console.log('La base de datos esta corriendo')
    }catch(error){
        console.log (error)
        throw new Error ('Error al conectar a la base de datos');
    }
}

module.exports = {dbConnection}