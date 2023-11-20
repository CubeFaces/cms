const { Router } = require('express');

const sessionsController = require('../controllers/sessions')

const sessionsRouter = Router();

sessionsRouter.get('/', sessionsController.getSessions);

module.exports = sessionsRouter;