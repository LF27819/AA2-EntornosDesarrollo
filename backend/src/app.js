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

app.get('/consolas', async (req, res) => {
    const consolas = await db('consolas').select('*');
    res.status(200).json(consolas);
});

app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});