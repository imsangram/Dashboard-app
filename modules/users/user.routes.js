const express = require('express'),
    router = express.Router(),
    UserController = require('./user.controller');

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

router.patch('/:id/password', UserController.updatePassword);

module.exports = router;