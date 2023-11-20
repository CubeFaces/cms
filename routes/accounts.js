const { Router } = require('express');

const accountsController = require('../controllers/accounts')

const accountsRouter = Router();

accountsRouter.get('/', accountsController.getAccounts);

module.exports = accountsRouter;