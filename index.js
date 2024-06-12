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
        // const query = 'select * from empresas where nome = $1 or nome = $2'
        // const params = ['Google', 'Facebook']
        // const query = 'update empresas set site = $1 where id = $2'
        // const params = ['www.cakewalk.com', 1]

        const query = 
            // select e.id as empresaId, f.id as filialId, e.nome, f.pais, p.nome as funcionario 
            // from empresas e 
            // join filiais f on e.id = f.empresa_id
            // join pessoas p on e.id = p.empresa_id; 
        
            // ` select e.id as empresasId, f.id as filiaisId, e.nome, f.pais 
            // from empresas e 
            // left join filiais f on e.id = f.empresa_id;

            // `
            // ` select e.id as empresasId, f.id as filiaisId, e.nome, f.pais 
            // from empresas e 
            // left join filiais f on e.id = f.empresa_id;
            // `
            `select e.id as empresasId, f.id as filiaisId, e.nome, f.pais 
            from empresas e 
            full join filiais f on e.id = f.empresa_id;
            `
        const resultado = await poll.query(query);
        return res.json(resultado.rows);
    } catch (error) {
        console.log(error.message)
    }
});

app.listen(3000);