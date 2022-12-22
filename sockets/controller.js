const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('disconnect', () => {});

    socket.emit('ultimo-ticket', ticketControl.ultimo); // emite el ultimo ticket

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        // TODO: Notificar que hay un new ticket pendiente asignar


    })

}



module.exports = {
    socketController
}

