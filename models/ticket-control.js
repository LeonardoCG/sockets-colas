const path = require('path');
const fs = require('fs');

//pantalla o escritorio
class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo =  0;
        this.hoy    = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { ultimo, hoy, tickets, ultimos4 } = require('../db/data.json');
        if( hoy === this.hoy ) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            //es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {
        
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson) ); // guardar convertido a json el tojson
    }

    //callback
    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket ); // se inserta en el array de tickets

        this.guardarDB();
        return 'Ticket: ' + ticket.numero;
    }

    ultimoSiguiente() {
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket ); // se inserta en el array de tickets

        this.guardarDB();
        return 'Ticket: ' + ticket.numero;
    }

    atenderTicket( escritorio ) {
        // no tenemos tickets
        if( this.tickets.length === 0 ) {
            return null;
        }

        const ticket = this.tickets.shift(); //remueve, retorna y borra
        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket ); // añadir un elemento al inicio
        
        if( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1); // corta el ultimo
       }



       this.guardarDB();
       return ticket;
    }

}

module.exports = TicketControl;  