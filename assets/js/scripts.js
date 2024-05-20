//----------------------------------animacion del navbar, que se vuelve transparente cuando sube----------------------------------
window.addEventListener("scroll", function(){
    var header = this.document.querySelector("nav");
    console.log(header);
    header.classList.toggle("sticky", this.window.scrollY > 0);
})



//----------------------------------enviar al correo electronico un mensaje, utilicé la aplicación EmailJS.com----------------------------------
const btn = document.getElementById('button');

document.getElementById('form')

.addEventListener('submit', function(event) {
    event.preventDefault();
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_8kie0wv';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar mensaje';
        alert('Mensaje enviado correctamente!');
      }, (err) => {
        btn.value = 'Enviar mensaje';
        alert(JSON.stringify(err));
      });
});

//----------------------------------API clima----------------------------------

// Obtener las referencias de los elementos del DOM/HTML
const ciudadInput = document.getElementById("ciudad");
// console.log(ciudad);
// obtenemos el botón
const obtenerPronosticoBtn = document.getElementById('obtenerPronostico');
// Obtener el div vacío donde están los resultados
const pronosticoDiv = document.getElementById('pronostico');
// obtener el evento click del botón
obtenerPronosticoBtn.addEventListener('click',obtenerPronostico);

function obtenerPronostico(){
    const ciudad = ciudadInput.value.trim();

    // verificar si el input tiene texto
    if(ciudad ===""){
        mostrarError('Por favor ingresa una ciudad');
        return;
    }
    const apiKey = "e3a091d131472686de75d37f67a34ca0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    // Realizar una solicitud HTTP utilizando Fetch con la URL
    fetch(url)
        // La respuesta se convierte a formato JSON
        .then(response => response.json())
        .then(data =>{
            mostrarPronostico(data);
        })
        .catch(error => {
            mostrarError('Error al obtener el pronostico');
        })
};

// Mostrar el pronóstico en el DOM
function mostrarPronostico(data){
    // Se obtienen los datos desde el JSON
    const {name,main,weather} = data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;

    //imprimir el objeto JSON
    console.log(data);

    cons = pronosticoHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}</p>
                <p class="card-text">Sensación: ${sensacion}</p>
                <p class="card-text">Humedad: ${humedad}</p>
            </div>
        </div>
    `;
    // se inserta el html generado en el elemento pronosticoDiv
    pronosticoDiv.innerHTML = pronosticoHTML;
};

function mostrarError(mensaje){
    // Crear una cadena HTML para mostrar el error
    const errorHTML = `
    <div class="alert alert-danger" role="alert">
        ${mensaje}
    </div>
    `;
    // insertar en el HTML en el elemento pronosticoDiv
    pronosticoDiv.innerHTML = errorHTML;
}

