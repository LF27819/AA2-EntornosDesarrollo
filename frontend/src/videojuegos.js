import axios from 'axios';

//Cargamos consolas y personajes para los select del formulario.
window.cargarConsolas = function() {
    axios.get('http://localhost:8080/consolas')
        .then((response) => {
            document.getElementById('id_consola').innerHTML = '<option value="">Selecciona una consola</option>';

            response.data.forEach(consola => {
                document.getElementById('id_consola').innerHTML +=
                    '<option value="' + consola.id_consola + '">' + consola.nombre + '</option>';
            });
        });
};

window.cargarPersonajes = function() {
    axios.get('http://localhost:8080/personajes')
        .then((response) => {
            document.getElementById('id_personaje').innerHTML = '<option value="">Selecciona un personaje</option>';

            response.data.forEach(personaje => {
                document.getElementById('id_personaje').innerHTML +=
                    '<option value="' + personaje.id_personaje + '">' + personaje.nombre + '</option>';
            });
        });
};

//Carga juegos en la tabla
window.readVideojuegos = function() {
    axios.get('http://localhost:8080/videojuegos')
        .then((response) => {
            const videojuegos = response.data;
            const tabla = document.getElementById('containerVideojuegos');

            tabla.innerHTML = '';

            videojuegos.forEach(videojuego => {
                const fila = document.createElement('tr');
                fila.innerHTML =
                    '<td>' + videojuego.id_videojuego + '</td>' +
                    '<td>' + videojuego.titulo + '</td>' +
                    '<td>' + (videojuego.anio ?? '') + '</td>' +
                    '<td>' + (videojuego.genero ?? '') + '</td>' +
                    '<td>' + (videojuego.nombre_consola ?? '') + '</td>' +
                    '<td>' + (videojuego.nombre_personaje ?? '') + '</td>' +
                    '<td class="text-center">' +
                        '<button class="btn btn-sm btn-warning me-2" onclick="editVideojuego(' + videojuego.id_videojuego + ', \'' + videojuego.titulo + '\', \'' + (videojuego.anio ?? '') + '\', \'' + (videojuego.genero ?? '') + '\', \'' + (videojuego.id_consola ?? '') + '\', \'' + (videojuego.id_personaje ?? '') + '\')">Editar</button>' +
                        '<button class="btn btn-sm btn-danger" onclick="deleteVideojuego(' + videojuego.id_videojuego + ')">Eliminar</button>' +
                    '</td>';

                tabla.appendChild(fila);
            });
        });
};

//Editamos videojuegos
window.editVideojuego = function(id, titulo, anio, genero, idConsola, idPersonaje) {
    document.getElementById('id_videojuego').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('anio').value = anio;
    document.getElementById('genero').value = genero;
    document.getElementById('id_consola').value = idConsola;
    document.getElementById('id_personaje').value = idPersonaje;
    document.getElementById('btnGuardarVideojuego').textContent = 'Actualizar videojuego';
};

//Borramos videojuego
window.deleteVideojuego = function(id) {
    if (confirm('¿Está seguro de que desea eliminar este videojuego?')) {
        axios.delete('http://localhost:8080/videojuegos/' + id)
            .then(() => {
                readVideojuegos();
                limpiarFormulario();
                alert('Videojuego eliminado correctamente');
            });
    }
};

//Limpiar el formulario
window.limpiarFormulario = function() {
    document.getElementById('id_videojuego').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('id_consola').value = '';
    document.getElementById('id_personaje').value = '';
    document.getElementById('btnGuardarVideojuego').textContent = 'Guardar videojuego';
};

document.getElementById('formVideojuego').addEventListener('submit', function(event) {
    event.preventDefault();

    if (document.getElementById('titulo').value == '') {
        alert('El título es obligatorio');
        return;
    }

    if (document.getElementById('anio').value == '') {
        alert('El año es obligatorio');
        return;
    }

    if (isNaN(document.getElementById('anio').value)) {
        alert('El año debe ser numérico');
        return;
    }

    if (document.getElementById('genero').value == '') {
        alert('El género es obligatorio');
        return;
    }

    if (document.getElementById('id_consola').value == '') {
        alert('Debe seleccionar una consola');
        return;
    }

    if (document.getElementById('id_personaje').value == '') {
        alert('Debe seleccionar un personaje');
        return;
    }

    const videojuego = {
        titulo: document.getElementById('titulo').value,
        anio: document.getElementById('anio').value,
        genero: document.getElementById('genero').value,
        id_consola: document.getElementById('id_consola').value,
        id_personaje: document.getElementById('id_personaje').value
    };

    if (document.getElementById('id_videojuego').value == '') {
        axios.post('http://localhost:8080/videojuegos', videojuego)
            .then(() => {
                readVideojuegos();
                limpiarFormulario();
                alert('Videojuego añadido correctamente');
            });
    } else {
        axios.put('http://localhost:8080/videojuegos/' + document.getElementById('id_videojuego').value, videojuego)
            .then(() => {
                readVideojuegos();
                limpiarFormulario();
                alert('Videojuego actualizado correctamente');
            });
    }
});

document.getElementById('btnLimpiarVideojuego').addEventListener('click', function() {
    limpiarFormulario();
});

cargarConsolas();
cargarPersonajes();
readVideojuegos();