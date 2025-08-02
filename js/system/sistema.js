class Sistema {
  constructor() {
    if (Sistema.instance) {
      return Sistema.instance;
    }

    this.administradores = [];
    this.barberos = [];
    this.reservas = [];
    this.servicios = [];

    this.precarga();
    
    Sistema.instance = this;
  }



  static getInstance() {
    return new Sistema();
  }
  precarga() {
    this.precargarAdministradores();
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
  precargarAdministradores(){
  let  a = new Administrador("admin", "admin123");
  this.administradores.push(a);
  a = new Administrador("Victor", "Victor123");
  this.administradores.push(a);
}

login(usuario, password) {
  if (usuario && password) {
    let usuarioEncontrado = sistema.administradores.find(admin =>
      admin.userName.toLowerCase() == usuario.toLowerCase() &&
      admin.pass == password
    );

    return usuarioEncontrado || null;
  }
  return null;
}


}

window.addEventListener('load', () => { 
  getInstance();
  marcarLinkActivo();
})

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








