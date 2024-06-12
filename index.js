const express = require('express');
const { Pool } = require('pg');


const poll = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'aula_conexao_node_pg'
});

const app = express();

app.use(express.json());

app.get('/', async (req, res) =>{

    try {
       
        const resultado = await poll.query('select * from empresas');

       

        return res.json(resultado.rowCount);
    } catch (error) {
        console.log(error.message)
    }
});

app.listen(3000);