const pool = require('../pool/pool')
const bcrypt = require('bcrypt')
const messages = require('../messages/messages')
const checkError = require('../messages/errors')
const jwt = require('jsonwebtoken')
const apiPsswd = require('../apiPsswd')

const updateUser = (async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { nome, email, senha } = req.body
    try {
        if (!nome || !email || !senha) {
            return res.status(404).json({ mensagem: checkError(email, senha, nome) })
        }
        const { id } = jwt.verify(token, apiPsswd)
        const senhaCrypt = await bcrypt.hash(senha, 10)

        const { rowCount, rows } = await pool.query(`update usuarios set nome = $1, email = $2, senha = $3 where id = $4`, [nome, email, senhaCrypt, id])

        if (rowCount < 1) {
            return res.status(404).json(messages.userNotFound)
        }
        return res.status(200).json(rows[0])
    } catch (error) {
        res.status(401).json({ mensagem: messages.emailExists })
    }
})

module.exports = updateUser