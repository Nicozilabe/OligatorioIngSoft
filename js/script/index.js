//js de cada vista, por ejemplo: login, registro, dashboard, etc..
let sistema = new Sistema();
function dqs(valor){
    return document.querySelector(valor);
}

window.addEventListener('load', () => {
    cargarEventos();  
    sistema.cargarHeader();
})

function cargarEventos() {
    

}
