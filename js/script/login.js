
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


    dqs("#btn-login").addEventListener("click", login);
}

function login() {
    const username = dqs("#username").value;
    const password = dqs("#password").value;
    if (username !== "" && password != "") {
        let usuario = null;
        usuario = sistema.login(username, password);
        if(usuario !== null && usuario !== undefined) {
            localStorage.setItem("usuario", username);
            localStorage.setItem("id", usuario.id);
            window.location.href = "../../index.html";
        }else{
            dqs("#text-error-login").innerText = "Usuario o contraseña incorrectos.";
        }
    }else {
        dqs("#text-error-login").innerText = "Por favor, complete todos los campos.";
    }
}