const vuelos = JSON.parse(localStorage.getItem('vuelos'));
const cityOrigen = JSON.parse(localStorage.getItem('ciudadesOrigen'));
const cityDestino = JSON.parse(localStorage.getItem('ciudadesDestino'));
const contVuelos = document.getElementById('contVuelosDisponibles');
const user_id = JSON.parse(localStorage.getItem('id_user'));

console.log(user_id);
console.log(vuelos);
cargarVuelos(vuelos);

async function consultarAsientos(airplane_id) {
    const body = {
        airplane_id: airplane_id,
    };

    try {
        const peticion = await fetch('http://127.0.0.1:5000/seat/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const response = await peticion.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

function cargarVuelos() {

    for (let i = 0; i < vuelos.length; i++) {



        let div1 = document.createElement('div');
        div1.className = 'container contCardVuelo';
        div1.setAttribute('data-bs-toggle', 'collapse');
        div1.setAttribute('data-bs-target', `#reservaVuelo${vuelos[i].flight_id}`);
        div1.setAttribute('aria-expanded', 'false');
        div1.setAttribute('aria-controls', `reservaVuelo${vuelos[i].flight_id}`);

        div1.innerHTML = `
           <div class="card cardVuelosDisp">
                <div class="card-body cardVuelosDispBody">
                    <div class="d-flex">
                        <label class="lblCiudadVuelosDisp" id="origenVuelosDisp${vuelos[i].flight_id}">${cityOrigen[vuelos[i].origin_id-1]}</label>
                        <img src="/img/Arrow 1.png" alt="Imagen no encontrada" width="80px" height="40px" class="imgArrow">
                        <label class="lblCiudadVuelosDisp" id="destinoVuelosDisp${vuelos[i].flight_id}">${cityDestino[vuelos[i].destiny_id-1]}</label>
                    </div>
                    <label id="lblFechaVuelosDisp${vuelos[i].flight_id}" style="font-size: 24px; font-weight: 500; margin-top: 23px;">${vuelos[i].date}</label>
                    <label style="font-size: 24px; font-weight: bold; margin-top: 23px;">Check In:<label id="checkIn${vuelos[i].flight_id}">${vuelos[i].check_in}</label></label>
                    <label style="font-size: 24px; font-weight: bold; margin-top: 23px;">Check In:<label id="checkOut${vuelos[i].flight_id}">${vuelos[i].check_out}</label></label>      
                </div>
            </div>              
        `;

        let div2 = document.createElement('div');
        div2.className = 'collapse';
        div2.id = `reservaVuelo${vuelos[i].flight_id}`;

        div2.innerHTML = `
           <div class="container d-flex contDetaVuel" >
                <div class="d-flex flex-column cont1Vuel">
                    <label class="lblVuelosTlt">Origen</label>
                    <label class="lblCiudad" id=${vuelos[i].origin_id}>${cityOrigen[vuelos[i].origin_id-1]}</label>
                    <img src="/img/Arrow 3.png" alt="Imagen no encontrada" width="50px" style="margin: 20px auto;">
                    <label class="lblVuelosTlt">Destino</label>
                    <label class="lblCiudad" ${vuelos[i].destiny_id}>${cityDestino[vuelos[i].destiny_id-1]}</label>
                </div>
    
                <div class="d-flex flex-column cont2Vuel">
                    <label style="font-size: 24px; color: #099FBA; font-weight: 500; margin-left: 15px;">Tipo de asiento</label>
                    <select class="estiloSelectVuel" onchange="actualizarSelects()" id="selectTipoAsiento1">
                        <option value="1">Económica</option>
                        <option value="2">Económica Premium</option>
                        <option value="3">Business</option>
                        <option value="4">Primera Clase</option>
                        <option value="5">Suite</option>                                     
                    </select>
    
                    <label style="font-size: 24px; color: #099FBA; font-weight: 500; margin-left: 15px;"">Asiento</label>
                    <select class="estiloSelectVuel" id="selectAsiento1">
                       <option value="1">E1</option>
                       <option value="2">E2</option>
                    </select>
    
                    <label style="font-size: 24px; color: #099FBA; font-weight: 500; margin-left: 15px;"">Precio</label>
                    <label class="estiloSelectVuel" id="precio1">$100</label>
    
                    <button class="btnReservar" onclick="reservar()">Reservar</button>
                </div>
            </div>
        `;
        consultarAsientos(`${vuelos[i].flight_id}`);

        tipoAsiento = document.getElementById(`selectTipoAsiento${vuelos[i].flight_id}`);
        asiento = document.getElementById(`selectAsiento${vuelos[i].flight_id}`);
        precio = document.getElementById(`precio${vuelos[i].flight_id}`);

        contVuelos.appendChild(div1);
        contVuelos.appendChild(div2);
    }
}

function actualizarSelects() {

    let tipoAsiento = document.getElementById('selectTipoAsiento1');
    let asiento = document.getElementById('selectAsiento1');
    let precio = document.getElementById('precio1');

    if(tipoAsiento.value == 1){
        asiento.innerHTML = '';

        asiento.innerHTML = `
            <option value="1">E1</option>
            <option value="2">E2</option>
        `;

        precio.innerHTML = '$100';
    }
    else if(tipoAsiento.value == 2){
        asiento.innerHTML = `
            <option value="3">EP1</option>
            <option value="4">EP2</option>
        `;
        precio.innerHTML = '$150';
    }
    else if(tipoAsiento.value == 3){
        asiento.innerHTML = `
            <option value="5">B1</option>
            <option value="6">B2</option>
        `;
        precio.innerHTML = '$300';
    }
    else if(tipoAsiento.value == 4){
        asiento.innerHTML = `
            <option value="7">PC1</option>
            <option value="8">PC2</option>
        `;
        precio.innerHTML = '$500';
    }
    else if(tipoAsiento.value == 5){
        asiento.innerHTML = `
            <option value="9">S1</option>
            <option value="10">S2</option>
        `;
        precio.innerHTML = '$800';
    }


}

async function reservar() {
    const body = {
        user_id: user_id,
        flight_id: vuelos[0].flight_id,
        seat_id: vuelos[0].airplane_id,
        airplane_id: document.getElementById('selectAsiento1').value
    };

    try {
        const peticion = await fetch('http://127.0.0.1:5000/asignar/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const response = await peticion.json();
        if(response.respuesta == 'El vuelo se registró exitosamente'){
            window.location.href = 'reservas.html';
        }

    } catch (error) {
        console.log(error);
    }
}
