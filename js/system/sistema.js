class Sistema {
  constructor() {
    if (Sistema.instance) {
      return Sistema.instance;
    }

    this.administradores = [];
    this.barberos = [];
    this.reservas = [];
    this.servicios = [];

    Sistema.instance = this;
  }

  saludar() {
    alert("Sistema iniciado");
  }
}
window.addEventListener('load', () => { 
    marcarLinkActivo();
})

function marcarLinkActivo() {
  const pagina = window.location.pathname.split('/').pop();
  const enlaces = document.querySelectorAll('.nav-list a');
  enlaces.forEach(link => {
    const destino = link.getAttribute('href');
    if (destino === pagina) {
      link.classList.add('active');
    }
  });
}

const sistema1 = new Sistema();
const sistema2 = new Sistema();

console.log(sistema1 === sistema2); 


