let sistema = new Sistema();
function dqs(valor){
    return document.querySelector(valor);
}

window.addEventListener('load', () => {
    sistema = Sistema.getInstance();
    cargarEventos();  
    marcarLinkActivo();
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

