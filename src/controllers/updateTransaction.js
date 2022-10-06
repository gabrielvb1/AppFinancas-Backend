const pool = require('../pool/pool');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')

const updateTransactions = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(401).json({ mensagem: messages.requiredFields })
        }
        const { id } = jwt.verify(token, apiPsswd)
        const { rows, rowCount } = await pool.query(`update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and usuario_id = $7`, [descricao, valor, data, categoria_id, tipo, Number(req.params.id), id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: messages.transNonexistent })
        }
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(404).json({ mensagem: messages.serverError })
    }
})

module.exports = updateTransactions