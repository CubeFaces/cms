const { Router } = require('express');

const VTController = require('../controllers/verificationTokens')

const tokensRouter = Router();

tokensRouter.get('/', VTController.getTokens);

module.exports = tokensRouter;