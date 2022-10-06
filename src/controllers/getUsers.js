const pool = require('../pool/pool');
const messages = require('../messages/messages')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')
const getUsers = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    try {
        const {id} = jwt.verify(token, apiPsswd)
        const { rows, rowCount } = await pool.query(`select id, nome, email from usuarios where id = $1`, [id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: messages.userNotFound })
        }
        return res.status(200).json(rows[0])
    } catch (error) {
        return res.status(401).json({ mensagem: "Erro interno do servidor" })
    }
})

module.exports = getUsers