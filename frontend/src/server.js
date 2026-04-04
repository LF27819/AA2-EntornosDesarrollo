import axios from 'axios';

window.readVideojuegos = function () {
    axios.get('http://localhost:8080/videojuegos/')
        .then((response) => {
            const videojuegosList = response.data;
            const container = document.getElementById('containerVideojuegos');

            videojuegosList.forEach(element => {
                const li = document.createElement('li');
                const text = document.createTextNode(
                    element.titulo + ' (' + element.anio + ') - ' + element.genero
                );
                li.appendChild(text);
                container.appendChild(li);
            });
        });
}