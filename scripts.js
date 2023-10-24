// Función para mostrar una sección y ocultar las demás
function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    document.querySelectorAll("section").forEach(function(seccion) {
        seccion.style.display = "none";
    });

    // Mostrar la sección seleccionada
    document.getElementById(seccionId).style.display = "block";

    // Mostrar el cuadro de reserva si la sección es "reservar"
    if (seccionId === "reservar") {
        document.getElementById("reserva").style.display = "block";
    }
    
}
// Función para redirigir a la sección de "Reservar"
function redirigirASeccionReservar() {
    mostrarSeccion("reservar"); // Esta función muestra la sección de "Reservar"
}

// Agrega un evento clic a los botones "Reservar"
const botonesReservar = document.querySelectorAll(".reservar-button");
botonesReservar.forEach(function (boton) {
    boton.addEventListener("click", redirigirASeccionReservar);
});


// Función para mostrar la página de inicio por defecto
function mostrarInicioPorDefecto() {
    mostrarSeccion("inicio");
}

// Manejar clics en los enlaces de navegación
document.getElementById("inicio-link").addEventListener("click", function() {
    mostrarSeccion("inicio");
});

document.getElementById("habitaciones-link").addEventListener("click", function() {
    mostrarSeccion("habitaciones");
});

document.getElementById("restaurante-link").addEventListener("click", function() {
    mostrarSeccion("restaurante");
});

document.getElementById("servicios-link").addEventListener("click", function() {
    mostrarSeccion("servicios");
});

document.getElementById("galeria-link").addEventListener("click", function() {
    mostrarSeccion("galeria");
});
// Manejar clic en el enlace de "Reservar" en la barra de navegación
document.getElementById("reservar-link").addEventListener("click", function() {
    mostrarSeccion("reservar");
});


// JavaScript para mostrar el mapa solo en la página de inicio
document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map-container"); // Selecciona el contenedor del mapa

    // Función para mostrar el mapa solo en la página de inicio
    function mostrarMapaEnInicio() {
        const esPaginaDeInicio = window.location.href.indexOf("index.html") > -1; // Ajusta la URL de la página de inicio
        if (esPaginaDeInicio) {
            mapContainer.style.display = "block"; // Muestra el mapa en la página de inicio
        } else {
          //  mapContainer.style.display = "none"; // Oculta el mapa en otras páginas
        }
    }

    // Llama a la función para mostrar u ocultar el mapa en función de la página actual
    mostrarMapaEnInicio();
});


// Mostrar la página de inicio por defecto al cargar la página
mostrarInicioPorDefecto();

// JavaScript para manejar la selección de habitación y cálculo de precio
document.addEventListener("DOMContentLoaded", function () {
    const reservaForm = document.getElementById("reserva-form");
    const habitacionSelect = document.getElementById("habitacion");
    const entradaInput = document.getElementById("entrada");
    const salidaInput = document.getElementById("salida");
    const adultosInput = document.getElementById("adultos");
    const ninosInput = document.getElementById("ninos");
    const resultadoReserva = document.getElementById("resultado-reserva");
  
    // Manejar el evento de envío del formulario
    reservaForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Valores de entrada
        const habitacion = habitacionSelect.value;
        const fechaEntrada = entradaInput.value;
        const fechaSalida = salidaInput.value;
        const numAdultos = adultosInput.value;
        const numNinos = ninosInput.value;

        // Precios por habitación
        const precios = {
            Individual: 80,
            Matrimonial: 110,
            MatrimonialDelux: 170,
            Doble: 140,
            Triple: 160,
            Suite: 150,
        };

        // Calcula la duración de la estancia
        const fechaEntradaObj = new Date(fechaEntrada);
        const fechaSalidaObj = new Date(fechaSalida);
        const duracionEstancia = (fechaSalidaObj - fechaEntradaObj) / (1000 * 60 * 60 * 24);

        // Precio total
        const precioTotal = precios[habitacion] * duracionEstancia * numAdultos;

        // Mostrar resultado de la reserva
        resultadoReserva.innerHTML = `
            <p>Su reserva es desde el ${fechaEntrada} al ${fechaSalida}, para ${duracionEstancia} noche(s).</p>
            <p>Adulto(s): ${numAdultos}</p>
            <p>Niño(s): ${numNinos}</p>
            <p>Precio total: S/${precioTotal}</p>
            <p>¡Completar Reservación!</p>
        `;
    });
});

//scripts para el carrusel de imagenes de la seccion galeria 
const carrusel = document.querySelector(".carrusel-items");

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1;
const start = () => {
  intervalo = setInterval(function () {
    carrusel.scrollLeft = carrusel.scrollLeft + step;
    if (carrusel.scrollLeft === maxScrollLeft) {
      step = step * -1;
    } else if (carrusel.scrollLeft === 0) {
      step = step * -1;
    }
  }, 10);
};

const stop = () => {
  clearInterval(intervalo);
};

carrusel.addEventListener("mouseover", () => {
  stop();
});

carrusel.addEventListener("mouseout", () => {
  start();
});

start();