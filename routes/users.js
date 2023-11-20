const { Router } = require('express');

const usersController = require('../controllers/users')

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);

module.exports = usersRouter;