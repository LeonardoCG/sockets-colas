//referencia html
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

// escuchar y muestra el ultimo en pantalla
socket.on('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.innerHTML = 'Ticket: ' +  ultimo;
});


// crea y emite el ticket en pantalla
btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});


