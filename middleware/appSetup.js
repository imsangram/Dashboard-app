const express = require('express'),
    compression = require('compression'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    path = require('path'),
    fs = require('fs'),
    constants = require('../config/constants');

module.exports = app => {
    app.use(express.json());

    if (constants.IS_PROD) {
        app.use(compression());
        app.use(helmet());
    }
    else {
        // log only 4xx and 5xx responses to console
        app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 400 }
        }));

        console.log(path.join(__dirname, 'access.log'));
        // log all requests to access.log
        app.use(morgan('common', {
            stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        }));
    }
};
