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
////////////////////////////////////////////////////////////////////////////////////
//Scripts para el cuadro de texto de la pagina de Inicio
function verMas() {
    var infoText = document.getElementById("infoText");
    var verMasBtn = document.getElementById("verMasBtn");

    if (infoText.style.maxHeight) {
        infoText.style.maxHeight = null;
        verMasBtn.textContent = "VER MÁS";
    } else {
        infoText.style.maxHeight = infoText.scrollHeight + "px";
        verMasBtn.textContent = "VER MENOS";
    }
}
///////////////////////////////////////////////////////////////////////////////////
//script para el video comercial de la pagina de inicio
window.fbAsyncInit = function() {
    FB.init({
        appId            : 'TU_APP_ID', // Reemplaza con tu ID de aplicación de Facebook
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v13.0'
    });
};
//////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////////////////////
//javaScript para el carrusel de imagenes de la seccion HABITACIONES//
document.addEventListener("DOMContentLoaded", function () {
    const carouselItemsHabitaciones = document.querySelectorAll(".carrusel-item");
    let currentIndexHabitaciones = 0;

    function mostrarSiguienteImagenHabitaciones() {
        carouselItemsHabitaciones[currentIndexHabitaciones].classList.remove("active");
        currentIndexHabitaciones = (currentIndexHabitaciones + 1) % carouselItemsHabitaciones.length;
        carouselItemsHabitaciones[currentIndexHabitaciones].classList.add("active");
    }

    setInterval(mostrarSiguienteImagenHabitaciones, 4000);
});

// JavaScript para manejar la selección de habitación, cálculo de precio, validación del formulario, envío y confirmación
document.addEventListener("DOMContentLoaded", function () {
    const reservaForm = document.getElementById("reserva-form");
    const habitacionSelect = document.getElementById("habitacion");
    const entradaInput = document.getElementById("entrada");
    const salidaInput = document.getElementById("salida");
    const adultosInput = document.getElementById("adultos");
    const ninosInput = document.getElementById("ninos");
    const resultadoReserva = document.getElementById("resultado-reserva");
    const completarReservaButton = document.getElementById("completar-reserva");

    // Configurar la fecha mínima para entrada como la fecha actual
    const fechaActual = new Date();
    const fechaActualStr = fechaActual.toISOString().split("T")[0];
    entradaInput.min = fechaActualStr;
    entradaInput.value = fechaActualStr; // Establecer la fecha actual como valor predeterminado

    // Función para habilitar el botón "Completar Reservación"
    function habilitarBotonReserva() {
        completarReservaButton.removeAttribute("disabled");
    }

    // Función para deshabilitar el botón "Completar Reservación"
    function deshabilitarBotonReserva() {
        completarReservaButton.setAttribute("disabled", "true");
    }

    // Eventos para habilitar/deshabilitar el botón cuando sea necesario
    habitacionSelect.addEventListener("change", verificarCondicionesYHabilitarBoton);
    adultosInput.addEventListener("input", verificarCondicionesYHabilitarBoton);
    ninosInput.addEventListener("input", verificarCondicionesYHabilitarBoton);

    // Configurar la fecha de salida como un mínimo de 1 día después de la fecha de entrada
    entradaInput.addEventListener("change", function () {
        const fechaEntrada = new Date(entradaInput.value);
        const fechaSalidaMin = new Date(fechaEntrada);
        fechaSalidaMin.setDate(fechaEntrada.getDate() + 1); // Mínimo 1 día después de la entrada
        const fechaSalidaMinStr = fechaSalidaMin.toISOString().split("T")[0];
        salidaInput.min = fechaSalidaMinStr;
        salidaInput.value = fechaSalidaMinStr; // Establecer como valor predeterminado
    });

    // Manejar el evento de envío del formulario
    reservaForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Validar el formulario
        if (validarFormulario()) {
            // Valores de entrada
            const habitacion = habitacionSelect.value.trim(); // Eliminar espacios en blanco
            const fechaEntrada = new Date(entradaInput.value);
            const fechaSalida = new Date(salidaInput.value);
            const numAdultos = parseInt(adultosInput.value, 10); // Convertir a número entero
            const numNinos = parseInt(ninosInput.value, 10); // Convertir a número entero

            // Limitaciones de ocupantes por habitación
            const limitaciones = {
                Individual: { maxAdultos: 1, maxNinos: 1 },
                Matrimonial: { maxAdultos: 2, maxNinos: 1 },
                MatrimonialDelux: { maxAdultos: 2, maxNinos: 1 },
                Doble: { maxAdultos: 3, maxNinos: 2 },
                Triple: { maxAdultos: 3, maxNinos: 3 },
                Suite: { maxAdultos: 2, maxNinos: 1 },
            };

            // Verificar las limitaciones de ocupantes
            if (
                numAdultos > limitaciones[habitacion].maxAdultos ||
                numNinos > limitaciones[habitacion].maxNinos
            ) {
                alert("La cantidad de ocupantes seleccionada no es válida para la habitación elegida.");
                return;
            }

            // Verificar que la fecha de salida sea en el futuro
            if (fechaSalida <= fechaEntrada) {
                alert("La fecha de salida debe ser posterior a la fecha de entrada.");
                return;
            }

            // Calcula la duración de la estancia en días
            const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
            const duracionEstancia = Math.ceil((fechaSalida - fechaEntrada) / unDiaEnMilisegundos);

            // Precio total
            const precios = {
                Individual: 80,
                Matrimonial: 110,
                MatrimonialDelux: 170,
                Doble: 140,
                Triple: 160,
                Suite: 150,
            };

            const precioTotal = precios[habitacion] * duracionEstancia;

            // Mostrar resultado de la reserva
            resultadoReserva.innerHTML = `
                <p>Su reserva es desde el ${fechaEntrada.toISOString().split("T")[0]} al ${fechaSalida.toISOString().split("T")[0]}, por ${duracionEstancia} día(s).</p>
                <p>Adulto(s): ${numAdultos}</p>
                <p>Niño(s): ${numNinos}</p>
                <p>Precio total: S/${precioTotal}</p>
            `;

            // Llamar a la función de verificación para habilitar/deshabilitar el botón
            verificarCondicionesYHabilitarBoton();
        }
    });

    // Función para validar el formulario
    function validarFormulario() {
        let esValido = true;

        if (habitacionSelect.value.trim() === "") {
            alert("Por favor, seleccione una habitación.");
            esValido = false;
        }

        if (adultosInput.value < 0 || ninosInput.value < 0) {
            alert("La cantidad de ocupantes no puede ser negativa.");
            esValido = false;
        }

        return esValido;
    }

    // Función para verificar si se cumplen las condiciones y habilitar/deshabilitar el botón
    function verificarCondicionesYHabilitarBoton() {
        const habitacionSelectValue = habitacionSelect.value.trim();
        const adultosInputValue = parseInt(adultosInput.value, 10);
        const ninosInputValue = parseInt(ninosInput.value, 10);

        // Verificar tus condiciones específicas aquí
        if (habitacionSelectValue !== "" && adultosInputValue >= 0 && ninosInputValue >= 0) {
            habilitarBotonReserva();
        } else {
            deshabilitarBotonReserva();
        }
    }

    // Agregar un evento al botón "Completar Reservación"
    completarReservaButton.addEventListener("click", function () {
        const habitacion = habitacionSelect.value;
        const fechaEntrada = entradaInput.value;
        const fechaSalida = salidaInput.value;
        const numAdultos = adultosInput.value;
        const numNinos = ninosInput.value;

        const mensajeWhatsApp = `¡Hola! Estoy interesado en reservar la habitación ${habitacion} desde el ${fechaEntrada} hasta el ${fechaSalida} para ${numAdultos} adulto(s) y ${numNinos} niño(s).`;

        const enlaceWhatsApp = `https://wa.me/51903501740?text=${encodeURIComponent(mensajeWhatsApp)}`;

        window.open(enlaceWhatsApp, "_blank");
    });

    // Llamar a la función de verificación para habilitar/deshabilitar el botón al cargar la página
    verificarCondicionesYHabilitarBoton();
});

//////////////////////////////////////////////////////////////////////////////////////////////
//scripts para el carrusel de imagenes de la seccion galeria 
