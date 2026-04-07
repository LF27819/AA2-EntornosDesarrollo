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
    if (confirm('¿Está seguro de que desea eliminar este personaje?')) {
        axios.delete('http://localhost:8080/personajes/' + id)
            .then(() => {
                readPersonajes();
                limpiarFormulario();
                alert('Personaje eliminado correctamente');
            });
    }
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

    if (document.getElementById('nombre').value == '') {
        alert('El nombre es obligatorio');
        return;
    }

    if (document.getElementById('rol').value == '') {
        alert('El rol es obligatorio');
        return;
    }

    if (document.getElementById('principal').value == '') {
        alert('Debe indicar si el personaje es principal');
        return;
    }

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
                alert('Personaje añadido correctamente');
            });
    } else {
        axios.put('http://localhost:8080/personajes/' + document.getElementById('id_personaje').value, personaje)
            .then(() => {
                readPersonajes();
                limpiarFormulario();
                alert('Personaje actualizado correctamente');
            });
    }
});

document.getElementById('btnLimpiarPersonaje').addEventListener('click', function() {
    limpiarFormulario();
});

readPersonajes();