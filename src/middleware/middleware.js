const apiSenha = require('../apiPsswd')
const jwt = require('jsonwebtoken')
const messages = require('../messages/messages')
const validadeToken = (async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ mensagem: messages.tokenX })
    }

    const token = authorization.split(' ')[1]

    try {
        jwt.verify(token, apiSenha)
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: messages.tokenX })
    }
})

module.exports = validadeToken