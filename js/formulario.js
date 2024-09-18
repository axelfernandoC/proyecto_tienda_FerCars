document.getElementById('datosForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let nomb = document.getElementById('inputNombre').value;
    let apell = document.getElementById('inputApellido').value;
    let ema = document.getElementById('inputEmail').value;
    let tel = document.getElementById('inputTelefono').value;

    let datos = {
        nombre: nomb,
        apellidos: apell,
        email: ema,
        telefono: tel
    };

    let datosJSON = JSON.stringify(datos);

    localStorage.setItem('formularioDatos', datosJSON);

    console.log("Datos guardados en localStorage:", datos);

    document.getElementById('datosForm').reset();

    Swal.fire({
        title: "Formulario enviado",
        text: `Gracias ${nomb} ${apell}, tus datos han sido guardados correctamente.
        Pronto un vendedor se pondra en contacto contigo.`,
        icon: "success"
    });
});


