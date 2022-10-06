const messages = require('./messages')

function checkError(email, senha, nome) {
    if (!email) {
        return messages.emailX
    }

    if (!senha) {
        return messages.passwordX
    }

     if(!nome){
        return messages.nameX
    }
}

module.exports = checkError