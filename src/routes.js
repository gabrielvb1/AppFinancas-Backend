const express = require('express');
const routes = express()
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const middleware = require('./middleware/middleware')

const signUp = require('./controllers/signUp');
const login = require('./controllers/login');
const getUsers = require('./controllers/getUsers');
const updateUser = require('./controllers/updateUser');
const getCategories = require('./controllers/getCategories');
const registerTransaction = require('./controllers/registerTransaction');
const getTransactions = require('./controllers/getTransactions');
const getTransactionsById = require('./controllers/getTransactionsById');
const updateTransactions = require('./controllers/updateTransaction');
const deleteTransactions = require('./controllers/deleteTransactions');
const transactionStatements = require('./controllers/transactionStatements');

routes.post('/usuario', jsonParser, signUp)
routes.post('/login', jsonParser, login)

routes.use(middleware)

routes.get('/usuario', getUsers)
routes.put('/usuario', jsonParser, updateUser)
routes.get('/categoria', getCategories)
routes.get('/transacao', getTransactions)
routes.get('/transacao/extrato', transactionStatements)
routes.get('/transacao/:id', getTransactionsById)
routes.post('/transacao', jsonParser, registerTransaction)
routes.put('/transacao/:id', jsonParser, updateTransactions)
routes.delete('/transacao/:id', deleteTransactions)

module.exports = routes