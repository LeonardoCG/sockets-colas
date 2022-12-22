const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('disconnect', () => {});

    socket.emit('ultimo-ticket', ticketControl.ultimo); // emite el ultimo ticket

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        // TODO: Notificar que hay un new ticket pendiente asignar


    });

    socket.on('atender-ticket', ( { escritorio }, callback ) => {
        if( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El Escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );
        if( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });

}



module.exports = {
    socketController
}

