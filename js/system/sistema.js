class Sistema {
  constructor() {
    if (Sistema.instance) {
      return Sistema.instance;
    }

    console.log("Iniciando sistema...");
    this.administradores = [];
    this.barberos = [];
    this.reservas = [];

    this.precarga();
    this.cargarHeader();
    Sistema.instance = this;
  }

  static getInstance() {
    return new Sistema();
  }
cargarHeader() {
  const usuario = (localStorage.getItem("usuario"));
  const header = document.querySelector("header");

  if (usuario) {
    // Header para usuarios logueados
    header.innerHTML = `
      <button class="abrir-menu" id="abrir">
        <img src="../img/logos/menu.png" alt="Logo Menu" />
      </button>
      <nav class="nav" id="nav">
        <button class="cerrar-menu" id="cerrar">
          <img src="../img/logos/x.png" alt="Logo Cerrar" />
        </button>
        <ul class="nav-list">
          <li><a href="/index.html">Inicio</a></li>
          <li><a href="/html/panelAdministrador.html">Panel Administrador</a></li>
          <li><a href="#" id="cerrarSesion">Cerrar sesión</a></li>
        </ul>
      </nav>
    `;
  } else {
    // Header para visitantes
    header.innerHTML = `
      <button class="abrir-menu" id="abrir">
        <img src="../img/logos/menu.png" alt="Logo Menu" />
      </button>
      <nav class="nav" id="nav">
        <button class="cerrar-menu" id="cerrar">
          <img src="../img/logos/x.png" alt="Logo Cerrar" />
        </button>
        <ul class="nav-list">
          <li><a href="/index.html">Inicio</a></li>
          <li><a href="/html/login.html">Login</a></li>
          <li><a href="#">Registrarse</a></li>
          <li><a href="/html/servicio.html">Servicios</a></li>
          <li><a href="/html/reservas.html">Reservar</a></li>
          <li><a href="#">Galería</a></li>
          <li><a href="/html/contacto.html">Contáctanos</a></li>
        </ul>
      </nav>
    `;
  }

  // Reasignar eventos de abrir/cerrar menú
  const nav = document.querySelector("#nav");
  const abrir = document.querySelector("#abrir");
  const cerrar = document.querySelector("#cerrar");

  abrir.addEventListener("click", () => nav.classList.add("visible"));
  cerrar.addEventListener("click", () => nav.classList.remove("visible"));

  // Evento para cerrar sesión (solo si está el botón)
  const btnCerrarSesion = document.querySelector("#cerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      location.reload(); // Recarga para reflejar el cambio
    });
  }
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
  const data = localStorage.getItem('reservas');
  if (!data) {
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
    this.reservas = reservasEjemplo;
    this.guardarReservas();
  } else {
    // Si hay datos en localStorage, los cargamos
    this.cargarReservas();
  }
}

getReservas() {
  const reservasJSON = localStorage.getItem("reservas");
  if (!reservasJSON) return [];

  try {
    const reservasParseadas = JSON.parse(reservasJSON);
    return reservasParseadas;
  } catch (e) {
    console.error("Error al parsear reservas:", e);
    return [];
  }
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
      // idReserva = this.reservas.length > 0 ? Math.max(...this.reservas.map(r => r.id)) + 1 : 1;
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

if (typeof require !== 'undefined') {
  // Si estamos en entorno Node (Jest), usamos require
  Administrador = require('../clases/administrador.js');
  Barbero = require('../clases/barbero.js');
  Reserva = require('../clases/reserva.js');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Sistema,
    getInstance: Sistema.getInstance
  };
}
