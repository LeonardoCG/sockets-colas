//refencias html

const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket    = document.querySelector('small');
const divAlerta    = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


//leer los params de la url
const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has( 'escritorio' )) {
    window.location = 'index.html';
    throw new Error('El Escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio'); // ver en el que me encuentro
lblEscritorio.innerText = 'Escritorio ' + escritorio;

//ocultar alert
divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

// escuchar y muestra el ultimo en pantalla
socket.on('tickets-pendientes',( pendientes ) => {
   
    if( pendientes === 0 ) {
        lblPendientes.display = 'none';
    }else {
        lblPendientes.display = ' ';
        lblPendientes.innerText = pendientes;
    }
    
});
 


// crea y emite el ticket en pantalla
btnAtender.addEventListener( 'click', () => {

    
    socket.emit( 'atender-ticket', { escritorio }, ({ ok, ticket, msg } ) => {
        
        if( !ok ) {
            lblTicket.innerText = 'Nadie';
            lblPendientes.innerText = '0';
            return divAlerta.style.display = ''; 

        }
        
        lblTicket.innerText = 'Ticket: ' + ticket.numero;
        
    });
});
