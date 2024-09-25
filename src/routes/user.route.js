const UserController = require('../controller/user.ctrl');

const UserRouter = require('express').Router();

UserRouter.get('/', UserController.getUsers);
UserRouter.get('/:id', UserController.getUserById);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);


module.exports = UserRouter;

