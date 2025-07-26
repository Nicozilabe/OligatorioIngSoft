//sistema, osea el "backend".

class Sistema {
  constructor() {}

  saludar() {
    alert("Sistema iniciado");
  }

  cargarHeader(tipo) {

    if(tipo === "Index") {
        dqs("#hT").style.display = "none";
        dqs("#hI").style.display = "block";
        dqs("#hR").style.display = "none";

    }else if(tipo === "Reservas") {
        dqs("#hT").style.display = "none";
        dqs("#hI").style.display = "none";
        dqs("#hR").style.display = "block";
    }else if(tipo == "Turno"){
        dqs("#hT").style.display = "block";
        dqs("#hI").style.display = "none";
        dqs("#hR").style.display = "none";
    }
    
  }
}
