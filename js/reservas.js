const user_id = JSON.parse(localStorage.getItem('id_user'));
const reservasCont = document.getElementById('reservasCont');

cargarReservas();

async function cargarReservas() {
    const body = {
        user_id: user_id
    };

    try {
        const peticion = await fetch('http://127.0.0.1:5000/macabron/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const response = await peticion.json();

        if(response != ''){

            document.getElementById('lblNombre').textContent = response[0].user_name;

            for(let i = 0; i < response.length; i++) {
                let div1 = document.createElement('div'); 
                div1.className = 'divReserva';
                div1.innerHTML = `
                <div class="divReserva">
                    <div class="card cardReserva">
                        <div class="card-body cardReservaBody d-flex flex-column">
                            <div class="d-flex" style="margin: 0 auto;">
                                <label class="lblCiudadVuelosDisp">${response[i].origin_city}</label>
                                <img src="/img/Arrow 1.png" alt="Imagen no encontrada" width="80px" height="40px" class="imgArrow">
                                <label class="lblCiudadVuelosDisp">${response[i].destiny_city}</label>
                            </div>
                            <div>
                                <label style="font-size: 24px; font-weight: 500; margin-top: 23px;">${response[i].date}</label>
                            </div>
                            <div class="d-flex contLbls">
                                <div>
                                    <label class="lblRes" style="font-weight: bold;">Ceck In</label><br>
                                    <label class="lblRes">${response[i].check_in}</label>
                                </div>
                                <div>
                                    <label class="lblRes" style="font-weight: bold;">Check Out</label><br>
                                    <label class="lblRes">${response[i].check_out}</label>
                                </div>
                                <div>
                                    <label class="lblRes" style="font-weight: bold;">Asiento</label><br>
                                    <label class="lblRes">${response[i].seat_name}</label>
                                </div>
                            </div>

                            <button class="btnCancelar" onclick="cancelar(${response[i].user_flight_id})">Cancelar</button>
                        </div>
                    </div>
                </div>                           
                `;            
                reservasCont.appendChild(div1);
            }         
        }
        else{
           let div1 = document.createElement('div'); 
           div1.className = 'divReserva';
           div1.innerHTML = `
           <div class="card cardReserva">
                <div class="card-body cardReservaBody d-flex flex-column">
                    <div>
                        <label style="font-size: 24px; font-weight: 500; margin-top: 23px;" id="lblFechaReserva">No tienes vuelos reservados</label>
                    </div>                   
                </div>
            </div>
           `;
           reservasCont.appendChild(div1);
        }

    } catch (error) {
        console.log(error);
    }
}

async function cancelar(user_flight_id) {

    Swal.fire({
        title: "¿Estás seguro de cancelar tu vuelo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B778A",
        cancelButtonColor: "#d33",
        cancelButtonText: "Regresar",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        
        if (result.isConfirmed) {
            confirmCancelar(user_flight_id)
        }
    });
}


async function confirmCancelar(user_flight_id) {
    const body = {
        user_flight_id: user_flight_id
    };

    try {
        const peticion = await fetch('http://127.0.0.1:5000/cancelar/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const response = await peticion.json();

        console.log(response)

        if(response.respuesta == 'Vuelo cancelado exitosamente'){
            location.reload();
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al cancelar el vuelo",
              });
        }

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al cancelar el vuelo",
          });
    }

}
