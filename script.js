let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}






function enviarCorreo() {
    // Definir los componentes del correo
    var asunto =     document.getElementById('asuntoInput').value;
    var nombre = document.getElementById('nombreInput').value;
    var telefono = document.getElementById('numeroTelefonoInput').value;
    var cuerpoMensaje =  "Hola soy "+nombre+" con telefono "+telefono+" te escribo con el motivo de /n"+document.getElementById('mensajeInput').value;;

    // Construir el enlace "mailto:"
    var mailtoLink = 'mailto:' + "gabrielgustavodiaz89@gmail.com" +
                     '?subject=' + encodeURIComponent(asunto) +
                     '&body=' + encodeURIComponent(cuerpoMensaje);

    // Abrir el cliente de correo electrónico
    window.location.href = mailtoLink;
  }
