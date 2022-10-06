const pool = require('../pool/pool');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')
const transactionStatements = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, apiPsswd)
        const { rows, rowCount } = await pool.query(`select * from transacoes where usuario_id = $1`, [id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: messages.transNonexistent })
        }
        let filterOut = rows.filter((trans) => {
            return trans.tipo === 'saida'
        })

        let filterIn = rows.filter((trans) => {
            return trans.tipo === 'entrada'
        })
        let Enter = { entrada: 0 }
        let Out = { saida: 0 }
        
        for (let trans of filterIn){
            Enter.entrada += trans.valor
        }

        for (let trans of filterOut){
            Out.saida += trans.valor
        }
        const statement = {...Enter, ...Out}
        return res.status(200).json(statement)
    } catch (error) {
        return res.status(401).json({ mensagem: messages.serverError })
    }
})
module.exports = transactionStatements