// app.js

const productos = [
    { id: 1, nombre: 'Mesa con 10 sillas', precio: 200, imagen: 'mesa10sillas.jpg' },
    { id: 2, nombre: 'Mesa', precio: 80, imagen: 'mesa.jpg' },
    { id: 3, nombre: 'Silla acojinada', precio: 15, imagen: 'silla.jpg' },
    { id: 4, nombre: 'Mantel blanco o negro', precio: 80, imagen: 'mantel.jpg' },
    { id: 5, nombre: 'Toldo 6x3', precio: 650, imagen: 'toldo.jpg' },
    { id: 6, nombre: 'Toldo con 1 mesa', precio: 800, imagen: 'toldo1mesa.jpg' },
    { id: 7, nombre: 'Toldo con 2 mesas', precio: 950, imagen: 'toldo2mesas.jpg' },
    { id: 8, nombre: 'Toldo con 3 mesas', precio: 1100, imagen: 'toldo3mesas.jpg' },
];

const municipios = {
    Tonala: { "Tonaltecas": 50, "La penal": 100, "El briceño": 150 },
    Zapopan: { "El colli": 80, "Las aguilas": 60, "Arenales tapatios": 70 },
    Guadalajara: { "Tres lagos": 120, "Rancho nuevo": 160, "El batan": 150 },
    Tlajomulco: { "Las pintas": 100, "El fortin": 120, "Loma bonita": 30 },
    Tlaquepaque: { "El sauz": 80, "Lomas de polanco": 80, "Miramar": 100 },
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
        div.classList.add('product');
        div.innerHTML = `
            <img src="images/${producto.imagen}" alt="${producto.nombre}">
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

    const municipio = municipioSelect.value;
    const coloniaData = municipios[municipio] || {};
    const colonia = coloniaInput.value.split(' ($')[0];
    const flete = coloniaData[colonia] || 0;

    fleteResumen.textContent = `Municipio: ${municipio || '-'} | Colonia: ${colonia || '-'} | Flete: $${flete}`;
    total += flete;

    document.getElementById('total-pagar').textContent = `Total a Pagar: $${total}`;
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
    document.getElementById('total-pagar').textContent = 'Total a Pagar: $0';
}

function setupBotones() {
    document.getElementById('reset').addEventListener('click', resetFormulario);
    // Implementar funcionalidad de enviar WhatsApp en el botón Hacer Pedido
}

// Inicializar la página
renderProductos();
setupMunicipios();
setupHorario();
setupBotones();
