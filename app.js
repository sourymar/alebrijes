const productos = [
    { id: 1, nombre: "Mesa con 10 sillas", precio: 200, imagen: "mesa_con_10_sillas.png" },
    { id: 2, nombre: "Mesa 2.40 mts.", precio: 90, imagen: "mesa.png" },
    { id: 3, nombre: "Mesa 1.80 mts.", precio: 80, imagen: "mesa.png" },
    { id: 4, nombre: "Mesa 1.20 mts.", precio: 70, imagen: "mesa.png" },
    { id: 5, nombre: "Silla acojinada", precio: 15, imagen: "silla_acojinada.png" },
    { id: 6, nombre: "Mantel blanco", precio: 80, imagen: "mantel.png" },
    { id: 7, nombre: "Mantel negro", precio: 80, imagen: "mantel_negro.png" },
    { id: 8, nombre: "Toldo 6x3", precio: 650, imagen: "toldo_6x3.png" },
    { id: 9, nombre: "Toldo con 1 mesa y 10 sillas", precio: 800, imagen: "toldo_con_1_mesa.png" },
    { id: 10, nombre: "Toldo con 2 mesas y 20 sillas", precio: 950, imagen: "toldo_con_1_mesa.png" },
    { id: 11, nombre: "Toldo con 3 mesas y 30 sillas", precio: 1100, imagen: "toldo_con_1_mesa.png" }
];

const municipios = {
    Zapopan: { "Lomas de Atemajac": 150, "La Tijera": 100, "Palmira": 100, "Prolongación las Fuentes": 50, "Las Fuentes": 50,
         "Jardines del Sol": 60, "Miramar": 100, "Polanco": 50, "Lomas de Polanco": 60, "El Fortin": 100, "Gustavo Diaz Ordaz": 50, 
         "Pinar de la Calma": 50, "La Calma": 50, "El Colli Urbano": 50, "Las aguilas": 50, "Arenales tapatios": 100, "El Sauz": 50,
         "Loma bonita": 30, "Miramar": 100, "Lomas de la primavera": 150 },
    Guadalajara: { "Atlas Chapalita": 70, "Chapalita": 80, "Tres lagos": 180, "Rancho nuevo": 170, "Americana": 100 },
    Tlajomulco: { "Las Pintas": 100, "El Fortin": 120, "El Palomar": 100 },
    Tlaquepaque: { "Las Huertas": 100, "Las Terrazas": 1500, "El Alamo": 120 }
};

const horarioEventos = [
    ...Array.from({ length: 26 }, (_, i) => {
        const hours = 8 + Math.floor(i / 2);
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${hours}:${minutes}`;
    }),
];

function renderProductos() {
    const container = document.getElementById('product-list');
    productos.forEach((producto) => {
        
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <input type="number" id="cantidad-${producto.id}" placeholder="0" min="0">
            <p>Importe: $<span id="importe-${producto.id}">0</span></p>
        `;
        container.appendChild(div);

        const cantidadInput = div.querySelector(`#cantidad-${producto.id}`);
        const importeSpan = div.querySelector(`#importe-${producto.id}`);

        cantidadInput.addEventListener('input', () => {
            const cantidad = parseInt(cantidadInput.value) || 0;
            const importe = cantidad * producto.precio;
            importeSpan.textContent = importe;
            actualizarResumen();
        });
    });
}

function actualizarResumen() {
    const resumenBody = document.getElementById('order-summary');
    resumenBody.innerHTML = '';
    let total = 0;

    productos.forEach((producto) => {
        const cantidad = parseInt(document.getElementById(`cantidad-${producto.id}`).value) || 0;
        if (cantidad > 0) {
            const importe = cantidad * producto.precio;
            total += importe;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${cantidad}</td>
                <td>$${importe}</td>
            `;
            resumenBody.appendChild(row);
        }
    });

    const fleteResumen = document.getElementById('resumen-flete');
    const municipioSelect = document.getElementById('municipio');
    const coloniaInput = document.getElementById('colonia');
    const fleteLabel = document.getElementById('flete-label');

    const municipio = municipioSelect.value;
    const coloniaData = municipios[municipio] || {};
    const colonia = coloniaInput.value.split(' ($')[0];
    const flete = coloniaData[colonia] || 0;

    fleteResumen.textContent = `Municipio: ${municipio || '-'} | Colonia: ${colonia || '-'} | Flete: $${flete}`;
    fleteLabel.textContent = `Costo de Flete: $${flete}`;
    total += flete;

    document.getElementById('total-pagar').textContent = `Total a Pagar: $${total}`;
    document.getElementById('flete-importe').textContent = `Costo del Flete: $${flete}`;
    document.getElementById('total-final').textContent = `Total Final: $${total}`;
}

function setupMunicipios() {
    const municipioSelect = document.getElementById('municipio');
    Object.keys(municipios).forEach((municipio) => {
        const option = document.createElement('option');
        option.value = municipio;
        option.textContent = municipio;
        municipioSelect.appendChild(option);
    });

    municipioSelect.addEventListener('change', (e) => {
        const selectedMunicipio = e.target.value;
        const coloniaDatalist = document.getElementById('colonias');
        coloniaDatalist.innerHTML = '';

        if (selectedMunicipio) {
            Object.entries(municipios[selectedMunicipio]).forEach(([colonia, costo]) => {
                const option = document.createElement('option');
                option.value = `${colonia} ($${costo})`;
                coloniaDatalist.appendChild(option);
            });
        }

        actualizarResumen();
    });

    const coloniaInput = document.getElementById('colonia');
    coloniaInput.addEventListener('input', actualizarResumen);
}

function setupHorario() {
    const horaSelect = document.getElementById('hora-evento');
    horarioEventos.forEach((hora) => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });
}

function resetFormulario() {
    document.getElementById('flete-form').reset();
    document.getElementById('pedido-form').reset();
    document.getElementById('order-summary').innerHTML = '';
    document.getElementById('resumen-flete').textContent = 'Municipio: - | Colonia: - | Flete: $0';
    document.getElementById('flete-label').textContent = 'Costo de Flete: $0';
    document.getElementById('flete-importe').textContent = 'Costo del Flete: $0';
    document.getElementById('total-final').textContent = 'Total Final: $0';
    document.getElementById('total-pagar').textContent = 'Total a Pagar: $0';
}

function enviarPedido() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const fechaEvento = document.getElementById('fecha-evento').value;
    const horaEvento = document.getElementById('hora-evento').value;

    const municipioSelect = document.getElementById('municipio');
    const coloniaInput = document.getElementById('colonia');
    const municipio = municipioSelect.value;
    const colonia = coloniaInput.value.split(' ($')[0];
    const flete = municipios[municipio]?.[colonia] || 0;

    const resumenBody = document.getElementById('order-summary');
    let pedidoText = `Datos del Pedido:\n\n`;

    Array.from(resumenBody.children).forEach((row) => {
        const columnas = row.children;
        pedidoText += `Producto: ${columnas[0].textContent}, Precio: ${columnas[1].textContent}, Cantidad: ${columnas[2].textContent}, Importe: ${columnas[3].textContent}\n`;
    });

    pedidoText += `\nFlete: Municipio: ${municipio}, Colonia: ${colonia}, Costo: $${flete}\n`;
    const total = document.getElementById('total-final').textContent;
    pedidoText += `\nTotal a Pagar: ${total}\n`;
    pedidoText += `\nDatos del Cliente:\nNombre: ${nombre}\nTeléfono: ${telefono}\nDirección: ${direccion}\nFecha del Evento: ${fechaEvento}\nHora del Evento: ${horaEvento}`;

    const url = `https://wa.me/3314687877?text=${encodeURIComponent(pedidoText)}`;
    window.open(url, '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
    // Botón Restablecer
    document.getElementById('reset').addEventListener('click', () => {
        // Restablece el formulario
        window.location.reload(true);
    });

    // Botón Hacer Pedido
    document.getElementById('send-order').addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const fechaEvento = document.getElementById('fecha-evento').value;
        const horaEvento = document.getElementById('hora-evento').value;
        const municipio = document.getElementById('municipio').value;
        const colonia = document.getElementById('colonia').value;
        const resumenFlete = document.getElementById('resumen-flete').textContent;
        const totalPagar = document.getElementById('total-pagar').textContent;

        const resumenArticulos = Array.from(document.querySelectorAll('#order-summary tr'))
            .map(row => {
                const cells = row.querySelectorAll('td');
                return `${cells[0].textContent} - Precio: ${cells[1].textContent}, Cantidad: ${cells[2].textContent}, Importe: ${cells[3].textContent}`;
            }).join('\n');

        if (!nombre || !telefono || !direccion || !fechaEvento || !horaEvento) {
            alert("Por favor, completa todos los datos del evento.");
            return;
        }
        const mensaje = `Hola, me interesa agendar lo siguiente:%0A*Datos del Pedido*%0A${resumenArticulos}%0A%0A${resumenFlete}%0A${totalPagar}%0A%0A*Datos del Evento*%0ANombre: ${nombre}%0ATeléfono: ${telefono}%0ADirección: ${direccion}%0AFecha del Evento: ${fechaEvento}%0AHora del Evento: ${horaEvento}`;

        const urlWhatsapp = `https://wa.me/3314687877?text=${mensaje}`;
        window.open(urlWhatsapp, '_blank');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});


// Inicializar la página
renderProductos();
setupMunicipios();
setupHorario();
setupBotones();
