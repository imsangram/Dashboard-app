const router = require('express').Router(),
    LoginController = require('./login.controller');

router.post('/', LoginController.login);

module.exports = router;