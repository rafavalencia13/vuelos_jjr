const registrar = async () => {

    localStorage.clear()

    const body = {
        name: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        address: document.getElementById('direccion').value,
        pswd: document.getElementById('password2').value
    };

    try {

        if (document.getElementById('password').value == document.getElementById('password2').value) {
            const peticion = await fetch('http://127.0.0.1:5000/create_user/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const res = await peticion.json();

            if (res.respuesta == 'El usuario se registró exitosamente') {           
                window.location.href = 'index.html';
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo sucedió mal, inténtalo más tarde",
                });
            }
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden",
            });
        }

    } catch (error) {
        console.log(error);
    }

};
