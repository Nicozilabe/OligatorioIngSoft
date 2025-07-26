let idReserva = 1;
class Reserva{
    constructor (nombre, telefono, email, fecha, hora, cliente, servicio, barbero){
        this.id = idReserva++;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.fecha = fecha;
        this.hora = hora;
        this.cliente = cliente;
        this.servicio = servicio;
        this.barbero = barbero;
    }
}
