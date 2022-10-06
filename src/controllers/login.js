const pool = require('../pool/pool');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const messages = require('../messages/messages')
const checkError = require('../messages/errors')
const apiSenha = require('../apiPsswd')
const login = (async (req, res) => {
    const { email, senha } = req.body
    try {
        if (!email || !senha) {
            return res.status(401).json({ mensagem: checkError(email, senha) })
        }
        const usuario = await pool.query(`select * from usuarios where email = $1`, [email])

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: messages.loginIncorrect })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: messages.loginIncorrect })
        }
        const token = jwt.sign({ id: usuario.rows[0].id }, apiSenha, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.status(200).json({ usuario: usuarioLogado, token })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = login