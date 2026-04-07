const express = require('express');
const cors = require('cors');
const knex = require('knex');
const { body, validationResult } = require('express-validator');

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


// Validaciones
const validarVideojuego = [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('anio')
        .notEmpty().withMessage('El año es obligatorio')
        .isNumeric().withMessage('El año debe ser numérico'),
    body('genero').notEmpty().withMessage('El género es obligatorio'),
    body('id_consola').notEmpty().withMessage('La consola es obligatoria'),
    body('id_personaje').notEmpty().withMessage('El personaje es obligatorio')
];

const validarConsola = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('fabricante').notEmpty().withMessage('El fabricante es obligatorio'),
    body('fecha_lanzamiento').notEmpty().withMessage('La fecha de lanzamiento es obligatoria'),
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser numérico y mayor que 0'),
    body('descontinuada').notEmpty().withMessage('Debe indicar si la consola está descontinuada')
];

const validarPersonaje = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('rol').notEmpty().withMessage('El rol es obligatorio'),
    body('principal').notEmpty().withMessage('Debe indicar si el personaje es principal')
];

function comprobarErrores(req, res) {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        res.status(400).json({ errores: errores.array() });
        return true;
    }

    return false;
}


//videojuegos
app.get('/videojuegos', async (req, res) => {
    const videojuegos = await db('videojuegos')
        .join('consolas', 'videojuegos.id_consola', '=', 'consolas.id_consola')
        .join('personajes', 'videojuegos.id_personaje', '=', 'personajes.id_personaje')
        .select(
            'videojuegos.*',
            'consolas.nombre as nombre_consola',
            'personajes.nombre as nombre_personaje'
        );

    res.status(200).json(videojuegos);
});

app.get('/videojuegos/:id_videojuego', async (req, res) => {
    const videojuego = await db('videojuegos')
        .select('*')
        .where({ id_videojuego: req.params.id_videojuego })
        .first();
    res.status(200).json(videojuego);
});

app.post('/videojuegos', validarVideojuego, async (req, res) => {
    const error = comprobarErrores(req, res);
    if (error) return;

    await db('videojuegos').insert({
        titulo: req.body.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        id_consola: req.body.id_consola,
        id_personaje: req.body.id_personaje
    });

    res.status(201).json({});
});

app.put('/videojuegos/:id_videojuego', validarVideojuego, async (req, res) => {
    const error = comprobarErrores(req, res);
    if (error) return;

    await db('videojuegos').update({
        titulo: req.body.titulo,
        anio: req.body.anio,
        genero: req.body.genero,
        id_consola: req.body.id_consola,
        id_personaje: req.body.id_personaje
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

app.post('/consolas', validarConsola, async (req, res) => {
    const error = comprobarErrores(req, res);
    if (error) return;

    await db('consolas').insert({
        nombre: req.body.nombre,
        fabricante: req.body.fabricante,
        fecha_lanzamiento: req.body.fecha_lanzamiento,
        precio: req.body.precio,
        descontinuada: req.body.descontinuada
    });

    res.status(201).json({});
});

app.put('/consolas/:id_consola', validarConsola, async (req, res) => {
    const error = comprobarErrores(req, res);
    if (error) return;

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


//personajes
app.get('/personajes', async (req, res) => {
    const personajes = await db('personajes').select('*');
    res.status(200).json(personajes);
});

app.get('/personajes/:id_personaje', async (req, res) => {
    const personaje = await db('personajes')
        .select('*')
        .where({ id_personaje: req.params.id_personaje })
        .first();

    res.status(200).json(personaje);
});

app.post('/personajes', validarPersonaje, async (req, res) => {
    const error = comprobarErrores(req, res);
    if (error) return;

    await db('personajes').insert({
        nombre: req.body.nombre,
        rol: req.body.rol,
        principal: req.body.principal
    });

    res.status(201).json({});
});

app.put('/personajes/:id_personaje', validarPersonaje, async (req, res) => {
    const error = comprobarErrores(req, res);
    if (error) return;

    await db('personajes').update({
        nombre: req.body.nombre,
        rol: req.body.rol,
        principal: req.body.principal
    }).where({ id_personaje: req.params.id_personaje });

    res.status(204).json({});
});

app.delete('/personajes/:id_personaje', async (req, res) => {
    await db('personajes')
        .del()
        .where({ id_personaje: req.params.id_personaje });

    res.status(204).json({});
});


app.listen(8080, () => {
    console.log('El backend se ha iniciado en el puerto 8080');
});