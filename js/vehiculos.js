const PRODUCTOS = [
    {
        id: 1,
        descripcion: 'Audi A3 Sportback',
        marca: 'Audi',
        color: 'Negro',
        fechaFabric: 2024,
        precioUsd: 41000,
        imagenes: "https://prod.pictures.autoscout24.net/listing-images/7d7656c8-3e4f-412a-b69f-c566886cd291_bb678cbf-fc6e-4a4c-aadc-c60094149924.jpg/1920x1080.webp"

    },
    {
        id: 2,
        descripcion: 'Volkswagen sirocco GTS',
        marca: 'volkswagen',
        color: 'Azul',
        fechaFabric: 2024,
        precioUsd: 35000,
        imagenes: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/VW_Scirocco_TSI_front.JPG/1200px-VW_Scirocco_TSI_front.JPG"
    },
    {
        id: 3,
        descripcion: 'Volkswagen golf GTI',
        marca: 'volkswagen',
        color: 'Gris',
        fechaFabric: 2024,
        precioUsd: 29000,
        imagenes: "https://www.rtautomotriz.com/images/VITACLASS/Ext223587-3.jpg?0"
    },
    {
        id: 4,
        descripcion: 'Peugeot RCZ coupé',
        marca: 'Peugeot',
        color: 'Rojo',
        fechaFabric: 2024,
        precioUsd: 28000,
        imagenes: "https://stellantis3.dam-broadcast.com/medias/domain12808/media101100/330238-0p959edxda-whr.jpg"
    },
    {
        id: 5,
        descripcion: 'Fiat 500X sport',
        marca: 'Fiat',
        color: 'Amarillo',
        fechaFabric: 2024,
        precioUsd: 26000,
        imagenes: "https://s1.cdn.autoevolution.com/images/news/gallery/2016-fiat-500x-expands-500-lineup-at-the-la-auto-show-live-photos_11.jpg"
    }
];

const cartas = document.getElementById('cardsVehiculos');


for (const producto of PRODUCTOS) {
    cartas.innerHTML += `
        <div class="card tarjetas-autos" style="width: 18rem;">
            <img src="${producto.imagenes}" class="card-img-top imagen-auto" alt="Imagen de producto">
            <div class="card-body">
                <h5 class="card-title">${producto.descripcion}</h5>
                <p class="card-text">Color: ${producto.color}</p>
                <p class="card-text">Año de fabricación: ${producto.fechaFabric}</p>
                <p class="card-text">Valor :  ${producto.precioUsd} U$D</p>
                <a href="#" class="btn btn-dark compra" id="${producto.id}">Comprar</a>
            </div>
        </div>`;
}

const botonesComprar = document.getElementsByClassName('compra');

for (const boton of botonesComprar) {
    boton.addEventListener('click', (event) => {
        const productId = parseInt(event.target.id);
        const productoSeleccionado = PRODUCTOS.find(producto => producto.id === productId);

        productoSeleccion(productoSeleccionado);
    });
}
//utilizando SweetAlert.
function productoSeleccion(productoSeleccionado) {
    Swal.fire({
        title: "¡Producto seleccionado!",
        html: `
            <img src="${productoSeleccionado.imagenes}" style="max-width: 100%;" alt="Imagen de producto">
            <p><strong>Descripción:</strong> ${productoSeleccionado.descripcion}</p>
            <p><strong>Color:</strong> ${productoSeleccionado.color}</p>
            <p><strong>Año de fabricación:</strong> ${productoSeleccionado.fechaFabric}</p>
            <p><strong>Valor:</strong> ${productoSeleccionado.precioUsd} U$D</p>
            <h4>¿Desea confirmar la compra?</h4>
        `,
        showCancelButton: true,
        confirmButtonColor: "#1f1f1f",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Confirmo la compra",
        cancelButtonText: "Cancelar",
        cancelButtonAriaLabel: "Cancelar",
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            Swal.fire({
                showCancelButton: false,
                title: "¡Felicitaciones!",
                text: "Estas muy cerca de obtener tu vehiculo",
                text: "Seras redireccionado a otra pagina para finalizar la compra.",
                icon: "success", showCancelButton: false,
                showCancelButton: true,
                confirmButtonColor: "#1f1f1f",
                cancelButtonColor: "#d33",
                confirmButtonText: 'Aceptar y finalizar.',
                cancelButtonText: "Cancelar",
                cancelButtonAriaLabel: "Cancelar",
            }).then((resultado) => {
                if (resultado.isConfirmed) {
                    // Redireccionar a otra página
                    window.location.href = "../paginas/pagoe.html";
                }
            });
        }
    });
}

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
