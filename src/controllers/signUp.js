const pool = require('../pool/pool');
const bcrypt = require('bcrypt')
const messages = require('../messages/messages');
const checkError = require('../messages/errors');

const signUp = (async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        if (!email || !senha || !nome) {
            return res.status(404).json({ mensagem: checkError(email, senha, nome) })
        }
    
        const senhaCrypt = await bcrypt.hash(senha, 10)

        const query = `insert into usuarios(nome, email, senha) values($1, $2, $3) returning id, nome, email`
        const { rows } = await pool.query(query, [nome, email, senhaCrypt])
        return res.status(200).json(rows[0])
    }
    catch (error) {

        return res.status(500).json({ mensagem: "E-mail informado já existe!"})
    }
})

module.exports = signUp