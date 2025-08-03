function dqs(valor){
  return document.querySelector(valor);
}

window.addEventListener('load', () => {

  dqs("#btnFormulario").addEventListener("click", enviarCorreo);

  sistema = Sistema.getInstance();
  let lat = -34.89864120879972;

  let lon = -56.16871343558183;

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


  //pestañas movil
  const tabBtns = document.querySelectorAll('.tabBtn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // activar botón
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // mostrar panel
      const tab = btn.dataset.tab;
      document.querySelectorAll('.panel')
        .forEach(panel => panel.classList.remove('active'));
      dqs(`#${tab}Panel`).classList.add('active');
    })
  })
});

function enviarCorreo(){
  const nombre = dqs("#nombContacto").value;
  const apellido = dqs("#ApeContacto").value;
  const email = dqs("#emailContacto").value;
  const mensaje = dqs("#mensgContacto").value;

  if (!nombre || !apellido || !email || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
  } else if(!esEmailValido(email)){
    alert("Email inválido.");
    return;
  } 

  alert("Correo enviado");
}

function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}