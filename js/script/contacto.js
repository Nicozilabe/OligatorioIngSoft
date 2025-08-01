
const lat = -34.89864120879972;
const lon = -56.16871343558183;

const map = L.map('map').setView([lat, lon], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([lat, lon]).addTo(map)
.bindPopup('Victor Barbershop')
.openPopup();


const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
})
cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

const pagina = window.location.pathname.split('/').pop();
const enlaces = document.querySelectorAll('.nav-list a');

enlaces.forEach(link => {
  const destino = link.getAttribute('href');
  if (destino === pagina) {
    link.classList.add('active');
  }
});