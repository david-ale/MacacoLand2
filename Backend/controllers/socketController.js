const usuarios = [];
const socketController = (socket, io) => {

    usuarios.push(socket.id)
    io.emit('usuarios-activos',usuarios);

    console.log('Cliente conectado',socket.id);

    socket.on('disconnect', ()=>{
        usuarios.splice(usuarios.indexOf(socket.id),1);
        console.log('Cliente desconectado', socket.id);
    })
    
    socket.on('mensaje-de-cliente',(payload, callback)=>{
        callback('Tu mensaje fue recibido');

        payload.from = 'Desde el servidor'
        socket.broadcast.emit('mensaje-de-server',payload);
    })

    socket.on('enviar-mensje', ({to,from,mensaje}) =>{
        if(to)
            socket.to(to).emit('recibir-mensaje',{to,from,mensaje});
        else
            io.emit('recibir-mensaje', {from,mensaje});
    })

}

module.exports = {socketController}