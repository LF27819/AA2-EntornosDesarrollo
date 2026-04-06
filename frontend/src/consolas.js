import axios from 'axios';

window.readConsolas = function() {
    axios.get('http://localhost:8080/consolas')
        .then((response) => {
            const consolas = response.data;
            const tabla = document.getElementById('containerConsolas');

            tabla.innerHTML = '';

            consolas.forEach(consola => {
                const fila = document.createElement('tr');
                fila.innerHTML =
                    '<td>' + consola.id_consola + '</td>' +
                    '<td>' + consola.nombre + '</td>' +
                    '<td>' + consola.fabricante + '</td>' +
                    '<td>' + (consola.fecha_lanzamiento ?? '') + '</td>' +
                    '<td>' + (consola.precio ?? '') + '</td>' +
                    '<td>' + (consola.descontinuada == 1 ? 'Sí' : 'No') + '</td>' +
                    '<td class="text-center">' +
                        '<button class="btn btn-sm btn-warning me-2" onclick="editConsola(' + consola.id_consola + ', \'' + consola.nombre + '\', \'' + consola.fabricante + '\', \'' + (consola.fecha_lanzamiento ?? '') + '\', \'' + (consola.precio ?? '') + '\', \'' + (consola.descontinuada ?? '') + '\')">Editar</button>' +
                        '<button class="btn btn-sm btn-danger" onclick="deleteConsola(' + consola.id_consola + ')">Eliminar</button>' +
                    '</td>';

                tabla.appendChild(fila);
            });
        });
};

window.editConsola = function(id, nombre, fabricante, fecha, precio, descontinuada) {
    document.getElementById('id_consola').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('fabricante').value = fabricante;
    document.getElementById('fecha_lanzamiento').value = fecha;
    document.getElementById('precio').value = precio;
    document.getElementById('descontinuada').value = descontinuada;
    document.getElementById('btnGuardarConsola').textContent = 'Actualizar consola';
};

window.deleteConsola = function(id) {
    axios.delete('http://localhost:8080/consolas/' + id)
        .then(() => {
            readConsolas();
            limpiarFormulario();
        });
};

window.limpiarFormulario = function() {
    document.getElementById('id_consola').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('fecha_lanzamiento').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descontinuada').value = '';
    document.getElementById('btnGuardarConsola').textContent = 'Guardar consola';
};

document.getElementById('formConsola').addEventListener('submit', function(event) {
    event.preventDefault();

    const consola = {
        nombre: document.getElementById('nombre').value,
        fabricante: document.getElementById('fabricante').value,
        fecha_lanzamiento: document.getElementById('fecha_lanzamiento').value,
        precio: document.getElementById('precio').value,
        descontinuada: document.getElementById('descontinuada').value
    };

    if (document.getElementById('id_consola').value == '') {
        axios.post('http://localhost:8080/consolas', consola)
            .then(() => {
                readConsolas();
                limpiarFormulario();
            });
    } else {
        axios.put('http://localhost:8080/consolas/' + document.getElementById('id_consola').value, consola)
            .then(() => {
                readConsolas();
                limpiarFormulario();
            });
    }
});

document.getElementById('btnLimpiarConsola').addEventListener('click', function() {
    limpiarFormulario();
});

readConsolas();