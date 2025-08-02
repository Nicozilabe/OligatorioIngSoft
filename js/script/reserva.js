

function dqs(valor){
    return document.querySelector(valor);
}

window.addEventListener('load', () => {
    sistema = Sistema.getInstance();
    cargarEventos();  
    marcarLinkActivo();

    sistema.precargarBarberos();
    cargarSelectBarberos(sistema);

    dqs("#btnReservar").addEventListener("click", reservar);
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
        option.value = barbero.id; // valor del option (id del barbero)
        option.textContent = `${barbero.nombre} ${barbero.apellido}`; // texto visible
        selectBarberos.appendChild(option);
    });
  }
}

function reservar() {
    const confirmado = dqs("#checkServ").checked;
    if (!confirmado) {
        alert("Debes aceptar la confirmación para poder reservar.");
        return;
    }

    const nombre = dqs("#nombreCliente").value;
    const telefono = dqs("#telefonoCliente").value;
    const email = dqs("#emailCliente").value;
    const fecha = dqs("#fechaServ").value;
    const hora = dqs("#horaServ").value;
    const barberoId = dqs("#slcBarberos").value;
    
    const checkboxes = document.querySelectorAll('input[name="servicios"]:checked');
    const serviciosSeleccionados = Array.from(checkboxes).map(cb => cb.value);

    if (!nombre || !telefono || !email || !fecha || !hora || serviciosSeleccionados.length === 0 || !barberoId) {
        alert("Por favor, completa todos los campos.");
        return;
    } else if(!esTelefonoValido(telefono)){
        alert("Número de teléfono inválido.");
        return;
    } else if(!esEmailValido(email)){
        alert("Email inválido.");
        return;
    } else if (!esHoraValida(hora)) {
        alert("La hora debe estar entre 09:00 y 17:30, en intervalos de 30 minutos.");
        return;
    } else if (!esFechaValida(fecha)) {
        alert("La fecha debe ser hoy o posterior, y no debe ser sábado ni domingo.");
        return;
    }

    // Buscar el barbero por ID
    const barbero = sistema.barberos.find(b => b.id == barberoId);
    if (!barbero) {
        alert("Barbero no encontrado.");
        return;
    }

    const nuevaReserva = new Reserva(
        nombre,
        telefono,
        email,
        fecha,
        hora,
        serviciosSeleccionados,
        barbero
    );

    console.log("Reserva");
    sistema.reservas.push(nuevaReserva);
    sistema.guardarReservas?.();
    console.log(sistema.reservas);

    alert("Reserva guardada correctamente.");
    dqs("#formReservas").reset();
}
