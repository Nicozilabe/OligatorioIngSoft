
function dqs(valor){
    return document.querySelector(valor);
}

window.addEventListener('load', () => {
    cargarEventos();  
    marcarLinkActivo();
    
    let sistema = Sistema.getInstance();
    sistema.precargarBarberos();
    cargarSelectBarberos(sistema);
})

function cargarEventos() {
    const nav = dqs("#nav");
    const abrir = dqs("#abrir");
    const cerrar = dqs("#cerrar");

    if(abrir && nav){
        abrir.addEventListener("click", () => {
            nav.classList.add("visible");
        });
    }
    if(cerrar && nav){
        cerrar.addEventListener("click", () => {
            nav.classList.remove("visible");
        });
    }
}

function cargarSelectBarberos(sistema) {
  // Llenar select con barberos
  const selectBarberos = document.querySelector('#slcBarberos');
  if (selectBarberos) {
    // Limpiar opciones existentes
    selectBarberos.innerHTML = '';

    sistema.barberos.forEach(barbero => {
      const option = document.createElement('option');
      option.value = barbero.id;         // valor del option (id del barbero)
      option.textContent = `${barbero.nombre} ${barbero.apellido} (${barbero.especialidad})`;  // texto visible
      selectBarberos.appendChild(option);
    });
  }
}

