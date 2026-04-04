const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'mario.db'
    },
    useNullAsDefault: true
});

//videojuegos
app.get('/videojuegos', async (req, res) => {
    const videojuegos = await db('videojuegos').select('*');
    res.status(200).json(videojuegos);
});

app.get('/videojuegos/:id_videojuego', async (req, res) => {
    const videojuego = await db('videojuegos')
        .select('*')
        .where({ id_videojuego: req.params.id_videojuego })
        .first();
    res.status(200).json(videojuego);
});

app.post('/videojuegos', async (req, res) => {
    await db('videojuegos').insert({
        titulo: req.body.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        id_consola: req.body.id_consola
    });

    res.status(201).json({});
});

app.put('/videojuegos/:id_videojuego', async (req, res) => {
    await db('videojuegos').update({
        titulo: req.body.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        id_consola: req.body.id_consola
    }).where({ id_videojuego: req.params.id_videojuego });

    res.status(204).json({});
});

app.delete('/videojuegos/:id_videojuego', async (req, res) => {
    await db('videojuegos')
        .del()
        .where({ id_videojuego: req.params.id_videojuego });

    res.status(204).json({});
});

//consolas

app.get('/consolas', async (req, res) => {
    const consolas = await db('consolas').select('*');
    res.status(200).json(consolas);
});

app.get('/consolas/:id_consola', async (req, res) => {
    const consola = await db('consolas')
        .select('*')
        .where({ id_consola: req.params.id_consola })
        .first();

    res.status(200).json(consola);
});

app.post('/consolas', async (req, res) => {
    await db('consolas').insert({
        nombre: req.body.nombre,
        fabricante: req.body.fabricante,
        fecha_lanzamiento: req.body.fecha_lanzamiento,
        precio: req.body.precio,
        descontinuada: req.body.descontinuada
    });

    res.status(201).json({});
});

app.put('/consolas/:id_consola', async (req, res) => {
    await db('consolas').update({
        nombre: req.body.nombre,
        fabricante: req.body.fabricante,
        fecha_lanzamiento: req.body.fecha_lanzamiento,
        precio: req.body.precio,
        descontinuada: req.body.descontinuada
    }).where({ id_consola: req.params.id_consola });

    res.status(204).json({});
});

app.delete('/consolas/:id_consola', async (req, res) => {
    await db('consolas')
        .del()
        .where({ id_consola: req.params.id_consola });

    res.status(204).json({});
});


app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});