const pool = require('../pool/pool');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')
const getTransactions = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { filtro } = req.query
    try {
        const { id } = jwt.verify(token, apiPsswd)
        const { rows, rowCount } = await pool.query(`select transacoes.id, transacoes.descricao, transacoes.valor, transacoes.data, transacoes.categoria_id, transacoes.usuario_id, transacoes.tipo, 
        categorias.descricao as categoria_nome from transacoes left join categorias on categoria_id = categorias.id where usuario_id = $1
        `, [id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: messages.transNonexistent })
        }
        if (filtro) {
            for (let i = 0; i < filtro.length; i++) {
                filtro[i] = filtro[i].charAt(0).toUpperCase() + filtro[i].substring(1);
            }
            const transactions = rows.filter((item) => {
                return item.categoria_nome === filtro.find((item2) => {
                    return item2 === item.categoria_nome
                })
            })
            return res.status(200).json(transactions)
        }
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(401).json({ mensagem: messages.serverError })
    }
})

module.exports = getTransactions