const socket = io();

socket.on('connect', () => {
    console.log ('Connected', socket.id);
})

const payload = {
    mensaje: 'Hola mundo',
    uid: 432,
    fecha: '29/05/23'
}

socket.emit('mensaje-de-cliente',
    payload,
    (data) => {
        console.log('Respuesta a tu mensaje', data);
});

socket.on('mensaje-de-server', (payload) => {
    console.log(payload);
});

socket.on('disconnect', () => {
    console.log('Disconnected');
})