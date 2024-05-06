const autenticar = async () => {

    localStorage.clear()

    const body = {
        email: document.getElementById('email').value,
        pswd: document.getElementById('pswd').value
    };

    try {
        const peticion = await fetch('http://127.0.0.1:5000/login/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const res = await peticion.json();

        if(res.respuesta == 'true'){
            localStorage.setItem('id_user', JSON.stringify(res.id));
            window.location.href = 'buscarVuelo.html';
        }
        else if(document.getElementById('email').value == '' || document.getElementById('pswd').value == ''){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe llenar todos los campos",
              });
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email o contraseña incorrectos",
              });
        }

        console.log(res);

    } catch (error) {
        console.log(error);
    }

};
