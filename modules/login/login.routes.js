const router = require('express').Router(),
    LoginController = require('./login.controller'),
    UserController = require('../users/user.controller')

router.post('/login', LoginController.login);
router.post('/register', UserController.addUser);

module.exports = router;