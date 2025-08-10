function dqs(valor){
    return document.querySelector(valor);
}

window.addEventListener('load', () => {
    sistema = Sistema.getInstance();
    cargarEventos();  
    marcarLinkActivo();
    initServiciosTabs();
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

function initServiciosTabs() {
    const serviciosTabBtns = document.querySelectorAll('.servicios-tabs .tabBtn');
    if (serviciosTabBtns.length === 0) return;

    serviciosTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            serviciosTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            document.querySelectorAll('.servicios-panels .panel')
                .forEach(panel => panel.classList.remove('active'));
                
            const panelToShow = dqs(`#${tab}Panel`);
            if (panelToShow) {
                panelToShow.classList.add('active');
                setTimeout(() => {
                    panelToShow.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 100);
            }
        });
    });
    if (window.innerWidth <= 767) {
        const firstTab = serviciosTabBtns[0];
        if (firstTab) {
            firstTab.classList.add('active');
            const firstPanel = dqs(`#${firstTab.dataset.tab}Panel`);
            if (firstPanel) {
                firstPanel.classList.add('active');
            }
        }
    }
}