class Sistema {
  constructor() {
    if (Sistema.instance) {
      return Sistema.instance;
    }

    this.administradores = [];
    this.barberos = [];
    this.reservas = [];

    Sistema.instance = this;
  }

  static getInstance() {
    return new Sistema();
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