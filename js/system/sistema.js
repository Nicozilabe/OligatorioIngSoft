const Administrador = require('../clases/administrador.js');
const Barbero = require('../clases/barbero.js');
const Reserva = require('../clases/reserva.js');

class Sistema {
  constructor() {
    if (Sistema.instance) {
      return Sistema.instance;
    }

    this.administradores = [];
    this.barberos = [];
    this.reservas = [];

    this.precarga();
    
    Sistema.instance = this;
  }

  static getInstance() {
    return new Sistema();
  }

  precarga() {
    this.precargarAdministradores();    
    this.precargarBarberos();
    this.precargarReservas();

  }

  saludar() {
    alert("Sistema iniciado");
  }

  precargarBarberos() {
    const data = localStorage.getItem('barberos');
    if (!data) {
      // No hay barberos guardados, los precargamos
      this.barberos = [
        new Barbero("Carlos", "Rodriguez", "Fade"),
        new Barbero("Luis", "Martinez", "Barba"),
        new Barbero("Pedro", "Gonzalez", "Color y corte"),
      ];
      this.guardarBarberos();
    } else {
      // Hay datos guardados, los cargamos y recreamos instancias
      this.barberos = JSON.parse(data).map(
        b => new Barbero(b.nombre, b.apellido, b.especialidad)
      );
    }
  }

  precargarReservas() {
    let reservasEjemplo = [
      new Reserva(
        "Juan Pérez",
        "099123456",
        "juan@example.com",
        "2025-08-05",
        "15:30",
        ["Corte", "Barba"],
        this.barberoPorID(2)
      ),
      new Reserva(
        "María Gómez",
        "098765432",
        "maria@example.com",
        "2025-08-06",
        "10:00",
        ["Color", "Lavado"],
        this.barberoPorID(1)
      )
    ];
    

    this.reservas = (reservasEjemplo);

    this.guardarReservas();
  }

  getReservas() {
    return this.reservas;
  }

  barberoPorID(id) {
    return this.barberos.find(barbero => barbero.id === id);
  }
  guardarBarberos() {
    localStorage.setItem('barberos', JSON.stringify(this.barberos));
  }

  guardarReservas() {
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
  }

  cargarReservas() {
    const data = localStorage.getItem('reservas');
    if (data) {
      const reservasJson = JSON.parse(data);
      this.reservas = reservasJson.map(r => {
        const reserva = new Reserva(
          r.nombre,
          r.telefono,
          r.email,
          r.fecha,
          r.hora,
          r.servicios,
          r.barbero
        );
        reserva.id = r.id; 
        return reserva;
      });
      idReserva = this.reservas.length > 0 ? Math.max(...this.reservas.map(r => r.id)) + 1 : 1;
    }
  }

  precargarAdministradores(){
    let  a = new Administrador("admin", "admin123");
    this.administradores.push(a);
    a = new Administrador("Victor", "Victor123");
    this.administradores.push(a);
  }

  login(usuario, password) {
    if (usuario && password) {
      let usuarioEncontrado = this.administradores.find(admin =>
        admin.userName.toLowerCase() == usuario.toLowerCase() &&
        admin.pass == password
      );

      return usuarioEncontrado || null;
    }
    return null;
  }
}

window.addEventListener('load', () => { 
  const sistema = Sistema.getInstance(); // Obtener la instancia singleton
  sistema.precargarBarberos();           // Precargar barberos si no están
  sistema.cargarReservas();               // Cargar reservas guardadas
  marcarLinkActivo();                     // Marcar el link activo en menú
});

function marcarLinkActivo() {
  const pagina = window.location.pathname.split('/').pop();
  const enlaces = document.querySelectorAll('.nav-list a');
  enlaces.forEach(link => {
    const destino = link.getAttribute('href');
    if (destino && destino.endsWith(pagina)) {
      link.classList.add('active');
    }
  });
}

module.exports = {
  Sistema,
  getInstance: Sistema.getInstance,
};



