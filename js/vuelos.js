/*****************
 * CARGAR ORIGEN *
 *****************/

let ciudadesOrigen = [];
let ciudadesDestino = [];
let aeroOrigen = [];
let aeroDestino = [];

let selectOrigen = document.getElementById('selectOrigen');
let lblCiudadOrigen = document.getElementById('lblCiudadOrigen');
let btnOrigen = document.getElementById('btnOrigen');
let ciudadOrigen = document.getElementById('ciudadOrigen');
let paisOrigen = document.getElementById('paisOrigen');
let modalOrigen = document.getElementById('modal1');
let lblAeroOrigen = document.getElementById('lblAeroOrigen');


function abrirModalOrigen() {
    modalOrigen.style.display = 'block';
    getOrigen();
}


const getOrigen = async () => {

    selectOrigen.innerHTML = '';
    ciudadesOrigen = [];
    aeroOrigen = [];

    try {
        const peticion = await fetch('http://127.0.0.1:5000/origen/', {
            method: "GET",
        });

        const res = await peticion.json();

        for(let i = 0; i < res.length; i++) {
            let opt = document.createElement('option')
            opt.id = res[i].origin_id;
            opt.text = res[i].country;
            ciudadesOrigen.push(res[i].city);
            selectOrigen.appendChild(opt)
            lblCiudadOrigen.textContent = res[0].city
            aeroOrigen.push(res[i].airport);
        }

    } catch (error) {
        console.log(error);
    }
};

function cargarLblCiudadOrigen() {

    let selectedIndex = selectOrigen.selectedIndex;
    let selectedOptionId = parseInt(selectOrigen.options[selectedIndex].id, 10); // Asegúrate de convertir el ID a un número

    if (selectedOptionId > 0 && selectedOptionId <= ciudadesOrigen.length) {
        lblCiudadOrigen.textContent = ciudadesOrigen[selectedOptionId - 1];
    } else {
        console.error('ID de opción seleccionada fuera de rango.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    selectOrigen.addEventListener('change', cargarLblCiudadOrigen);
});

function aplicarOrigen(event) {
    let selectedIndex = selectOrigen.selectedIndex;
    let selectedOption = selectOrigen.options[selectedIndex].textContent;
    let selectedOptionId = selectOrigen.options[selectedIndex].id;

    ciudadOrigen.textContent = lblCiudadOrigen.textContent;
    paisOrigen.textContent = selectedOption;
    modalOrigen.style.display = 'none';

    if (selectedOptionId > 0 && selectedOptionId <= aeroOrigen.length) {
        lblAeroOrigen.textContent = aeroOrigen[selectedOptionId - 1];
    } else {
        console.error('ID de opción seleccionada fuera de rango.');
    }

    document.getElementById('origen').setAttribute("data-value", selectedOptionId) ;

}

function cerrarNavOrigen(){
    modalOrigen.style.display = 'none';
}

/******************
 * CARGAR DESTINOS 
 *****************/

let selectDestino = document.getElementById('selectDestino');
let lblCiudadDestino = document.getElementById('labelDestino');
let btnDestino = document.getElementById('btnDestino');
let ciudadDestino = document.getElementById('ciudadDestino');
let paisDestino = document.getElementById('paisDestino');
let lblAeroDestino = document.getElementById('lblAeroDestino');
let modalDestino = document.getElementById('modal2');


function abrirModalDestino() {
    modalDestino.style.display = 'block';
    getDestino();
}


const getDestino = async () => {

    selectDestino.innerHTML = '';
    ciudadesDestino = [];
    aeroDestino = [];


    try {
        const peticion = await fetch('http://127.0.0.1:5000/destino/', {
            method: "GET",
        });

        const response = await peticion.json();

        for(let i = 0; i < response.length; i++) {
            let opt = document.createElement('option')
            opt.id = response[i].destiny_id;
            opt.text = response[i].country;
            ciudadesDestino.push(response[i].city);
            selectDestino.appendChild(opt)
            lblCiudadDestino.textContent = response[0].city;
            aeroDestino.push(response[i].airport);
        }

    } catch (error) {
        console.log(error);
    }
};

function cargarLblCiudadDestino() {

    let selectedIndex = selectDestino.selectedIndex;
    let selectedOptionId = parseInt(selectDestino.options[selectedIndex].id, 10); // Asegúrate de convertir el ID a un número

    if (selectedOptionId > 0 && selectedOptionId <= ciudadesDestino.length) {
        lblCiudadDestino.textContent = ciudadesDestino[selectedOptionId - 1];
    } else {
        console.error('ID de opción seleccionada fuera de rango.');
    }
}

// Agregar el evento listener de manera segura después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    selectDestino.addEventListener('change', cargarLblCiudadDestino);
});

function aplicarDestino(event) {
    let selectedIndex = selectDestino.selectedIndex;
    let selectedOption = selectDestino.options[selectedIndex].textContent;
    let selectedOptionId = selectDestino.options[selectedIndex].id;

    ciudadDestino.textContent = lblCiudadDestino.textContent; 
    paisDestino.textContent = selectedOption; 
    modalDestino.style.display = 'none'; 

    if(ciudadDestino.textContent == 'Ciudad de México'){
        ciudadDestino.style.fontSize = '55px';
    }

    if (selectedOptionId > 0 && selectedOptionId <= aeroDestino.length) {
        lblAeroDestino.textContent = aeroDestino[selectedOptionId - 1];
    } else {
        console.error('ID de opción seleccionada fuera de rango.');
    }

    document.getElementById('destino').setAttribute("data-value", selectedOptionId) ;
}

function cerrarNavDestino(){
    modalDestino.style.display = 'none';
}


/*****************
 * BUSCAR VUELOS *
 *****************/

const buscarVuelos = async () => {

    //localStorage.clear()

    let indexOrigen = selectOrigen.selectedIndex;
    let indexDestino = selectDestino.selectedIndex;

    let origen_id = selectDestino.options[indexOrigen].id;
    let destino_id = selectDestino.options[indexDestino].id;

    const body = {
        origen_id: origen_id,
        destino_id: destino_id,
        date: document.getElementById('inputDate').value
    };

    try {
        const peticion = await fetch('http://127.0.0.1:5000/flight/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const response = await peticion.json();

        console.log(response);
        if(response.respuesta != 'No se encontraron vuelos') {

            localStorage.setItem('vuelos', JSON.stringify(response));
            localStorage.setItem('ciudadesOrigen', JSON.stringify(ciudadesOrigen));
            localStorage.setItem('ciudadesDestino', JSON.stringify(ciudadesDestino));
            window.location.href = 'vuelosDisponibles.html';
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Parece que no hay vuelos disponibles",
              });
        }

    

    } catch (error) {
        console.log(error);
    }
};
