let idServicio = 1;
class Servicio{
    constructor (nombre, precio, descripcion, duracion){
        this.id = idServicio++;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.duracion = duracion; 
    }
}