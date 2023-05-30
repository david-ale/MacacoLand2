const express = require('express');
require('dotenv').config();
const {dbConnection} = require('../database/config');
const cors = require('cors');
var bodyParser = require('body-parser');
const {validarJWT} = require('../middlewares/validar-token');
const{socketController} = require('../controllers/socketController');
class Server {
    constructor(){
        this.headers = {
            cors:{
                origin: "http://127.0.0.1:5173",
                methods: ["GET","POST"]
            }
        }

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server, this.headers)

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }
        this.connectToDB();
        this.addMidlewares();
        this.setRoutes();
        this.sockets();

    }
    
    async connectToDB(){
        await dbConnection();
    }

    addMidlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false}))
        this.app.use(["/index","/profile"],validarJWT)
    }

    setRoutes(){
        this.app.use(this.paths.auth , require('../routes/auth'))
        //this.app.use(this.paths.task, require('../routes/tasks'))

    }

    sockets(){

        this.io.on('connection', socket => socketController(socket, this.io));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }

}

module.exports = Server;