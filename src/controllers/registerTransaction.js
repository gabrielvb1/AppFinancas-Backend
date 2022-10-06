const pool = require('../pool/pool');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')

const registerTransaction = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { descricao, valor, data, categoria_id, tipo } = req.body
    try {
        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(401).json({ mensagem: messages.requiredFields })
        }
        const { id } = jwt.verify(token, apiPsswd)
        const { rows } = await pool.query(`
        
        WITH transacoes as (
            INSERT INTO transacoes(descricao, valor, data, categoria_id, tipo, usuario_id) 
          values($1,$2,$3,$4,$5, $6) 
          
          RETURNING *
        ) 
        SELECT  transacoes.id, transacoes.descricao, transacoes.valor, transacoes.data, transacoes.categoria_id, transacoes.usuario_id, transacoes.tipo, 
                categorias.descricao as categoria_nome 
        FROM categorias 
        right JOIN transacoes 
            ON categoria_id = categorias.id`, [descricao, valor, data, categoria_id, tipo, id])
        return res.status(200).json(rows[0])
    } catch (error) {
        return res.send(error.message)
    }
})

module.exports = registerTransaction