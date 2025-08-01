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


const sistema1 = new Sistema();
const sistema2 = new Sistema();

console.log(sistema1 === sistema2); 


