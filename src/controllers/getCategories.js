const pool = require('../pool/pool');
const messages = require('../messages/messages')

const getCategories = (async (req, res) => {
    try {
        const { rows, rowCount } = await pool.query(`select * from categorias`)
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: messages.catNonexistent })
        }
        return res.status(200).json(rows)

    } catch (error) {
        return res.status(401).json({ mensagem: messages.serverError })
    }
})

module.exports = getCategories