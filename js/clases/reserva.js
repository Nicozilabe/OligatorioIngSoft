let idReserva = 1;
class Reserva{
    constructor (nombre, telefono, email, fecha, hora, servicios, barbero){
        this.id = idReserva++;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.fecha = fecha;
        this.hora = hora;
        this.servicios = servicios;
        this.barbero = barbero;
    }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Reserva;
}