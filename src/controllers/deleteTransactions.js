const pool = require('../pool/pool');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')

const deleteTransactions = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    
    try {
        const { id } = jwt.verify(token, apiPsswd)
        const { rows, rowCount } = await pool.query(`delete from transacoes where id = $1 and usuario_id = $2`, [Number(req.params.id), id])
        if (rowCount < 1){
            return res.status(404).json({mensagem:messages.transNonexistent})
        }
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(401).json({ mensagem: error.message })
    }
})

module.exports = deleteTransactions