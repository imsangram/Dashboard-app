const express = require('express'),
    router = express.Router(),
    UserController = require('./user.controller');

router.get('/', UserController.getUsers);

router.post('/', UserController.addUser);

router.get('/:id', UserController.getUserById);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

module.exports = router;