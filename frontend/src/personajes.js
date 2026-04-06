import axios from 'axios';

window.readPersonajes = function() {
    axios.get('http://localhost:8080/personajes')
        .then((response) => {
            const personajes = response.data;
            const tabla = document.getElementById('containerPersonajes');

            tabla.innerHTML = '';

            personajes.forEach(personaje => {
                const fila = document.createElement('tr');
                fila.innerHTML =
                    '<td>' + personaje.id_personaje + '</td>' +
                    '<td>' + personaje.nombre + '</td>' +
                    '<td>' + (personaje.rol ?? '') + '</td>' +
                    '<td>' + (personaje.principal == 1 ? 'Sí' : 'No') + '</td>' +
                    '<td class="text-center">' +
                        '<button class="btn btn-sm btn-warning me-2" onclick="editPersonaje(' + personaje.id_personaje + ', \'' + personaje.nombre + '\', \'' + (personaje.rol ?? '') + '\', \'' + (personaje.principal ?? '') + '\')">Editar</button>' +
                        '<button class="btn btn-sm btn-danger" onclick="deletePersonaje(' + personaje.id_personaje + ')">Eliminar</button>' +
                    '</td>';

                tabla.appendChild(fila);
            });
        });
};

window.editPersonaje = function(id, nombre, rol, principal) {
    document.getElementById('id_personaje').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('rol').value = rol;
    document.getElementById('principal').value = principal;
    document.getElementById('btnGuardarPersonaje').textContent = 'Actualizar personaje';
};

window.deletePersonaje = function(id) {
    axios.delete('http://localhost:8080/personajes/' + id)
        .then(() => {
            readPersonajes();
            limpiarFormulario();
        });
};

window.limpiarFormulario = function() {
    document.getElementById('id_personaje').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('principal').value = '';
    document.getElementById('btnGuardarPersonaje').textContent = 'Guardar personaje';
};

document.getElementById('formPersonaje').addEventListener('submit', function(event) {
    event.preventDefault();

    const personaje = {
        nombre: document.getElementById('nombre').value,
        rol: document.getElementById('rol').value,
        principal: document.getElementById('principal').value
    };

    if (document.getElementById('id_personaje').value == '') {
        axios.post('http://localhost:8080/personajes', personaje)
            .then(() => {
                readPersonajes();
                limpiarFormulario();
            });
    } else {
        axios.put('http://localhost:8080/personajes/' + document.getElementById('id_personaje').value, personaje)
            .then(() => {
                readPersonajes();
                limpiarFormulario();
            });
    }
});

document.getElementById('btnLimpiarPersonaje').addEventListener('click', function() {
    limpiarFormulario();
});

readPersonajes();