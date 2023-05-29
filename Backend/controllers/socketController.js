
const socketController = (socket, io) => {
    console.log('Cliente desconectado',socket.id);

    socket.on('disconnect', ()=>{
        console.log('Cliente desconectado', socket.id)
    })
    
    socket.on('mensaje-de-cliente',(payload, callback)=>{
        callback('Tu mensaje ha sido enviado');
        payload.from = 'Desde el servidor'
        socket.broadcast.emit('mensaje-de-server',payload);
    })
}

module.exports = {socketController}