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
//Funcion que aplica las animaciones de las habilidades
/*function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}*/


//detecto el scrolling para aplicar la animacion de la barra de habilidades
/*window.onscroll = function(){
    efectoHabilidades();
} */



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

