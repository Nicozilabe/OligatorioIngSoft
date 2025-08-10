
function dqs(valor) {
  return document.querySelector(valor);
}

window.addEventListener("load", () => {
  sistema = Sistema.getInstance();
  cargarEventos();
  marcarLinkActivo();
});

function cargarEventos() {
  const nav = dqs("#nav");
  const abrir = dqs("#abrir");
  const cerrar = dqs("#cerrar");

  if (abrir && nav) {
    abrir.addEventListener("click", () => {
      nav.classList.add("visible");
    });
  }
  if (cerrar && nav) {
    cerrar.addEventListener("click", () => {
      nav.classList.remove("visible");
    });
  }

  cargarReservas();
}

function cargarReservas() {
  const sectReservas = dqs("#sect-reservas");
  if (sectReservas) {
    sectReservas.innerHTML = "";

    reservas = sistema.getReservas();
    if (reservas.length === 0) {
      sectReservas.innerHTML = "<p>No hay reservas disponibles.</p>";
    } else {
      reservas.forEach((reserva) => {
        const divReserva = document.createElement("div");
        divReserva.classList.add("reserva");
        divReserva.innerHTML = `
        <div class="reserva-info">
        <p><strong>Cliente:</strong> ${reserva.nombre}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        <p><strong>Email:</strong> ${reserva.email}</p>
        <p><strong>Fecha:</strong> ${reserva.fecha}</p>
        <p><strong>Hora:</strong> ${reserva.hora}</p>
        <p><strong>Barbero:</strong> ${reserva.barbero.nombre} ${reserva.barbero.apellido}</p>
        </div>

            `;
        sectReservas.appendChild(divReserva);
      });
    }
  }
}