const txtUID = document.querySelector('#txtUID');
const txtMessage = document.querySelector('#txtMessage');
const listaUsuarios = document.querySelector('#lista-usuarios');
const chats = document.querySelector('#chats-body');
const private = document.querySelector('#private');

socket.on('usuarios-activos',(payload) =>{
    let usersHtml = ''
    payload.forEach(element => {
        if(socket.id === element)
            return;
        usersHtml += `<li>${element}</li>`
    });
    listaUsuarios.innerHTML = usersHtml;
});

txtMessage.addEventListener('keyup', ({keyCode}) => {
    const UID = txtUID.value
    const mensaje = txtMessage.value
    const payload = {
        from:socket.id,
        to: UID,
        mensaje
    }
    if(keyCode === 13 && mensaje.length > 0 && UID.length > 0){
        socket.emit('enviar-mensaje',payload);
    }else{
        return;
    }
});

socket.on('recibir-mensaje',(payload) => {
    console.log(payload);
    if(!payload.to){
        chats.innerHTML += `<li><small>${payload.mensaje}</small></li>`
    }else{
        private.innerHTML += `<li><small>${payload.mensaje}</small></li>`
    }
});

