function obtenerDolar() {
    const URLDOLAR = "https://api.bluelytics.com.ar/v2/latest";
    fetch(URLDOLAR)
        .then(convertir => convertir.json())
        .then(dato => {
            console.table(dato.blue);
            const listaDolar = dato.blue;

            const tablaBody = document.querySelector('#tablaDolar tbody');

            tablaBody.innerHTML = "";

            //cambio de nombre de las keys.
            const nombresClaves = {
                value_avg :"Promedio",
                value_buy: "Compra",
                value_sell: "Venta"

            };

            Object.entries(listaDolar).forEach(([llave, valor]) => {
                const nombre = nombresClaves[llave || llave]; 
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${nombre}</td>
                    <td>${valor}</td>
                `;
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

obtenerDolar();