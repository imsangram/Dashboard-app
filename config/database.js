const mongoose = require('mongoose'),
    constants = require('./constants'),
    dotenv = require('dotenv').config();

try {
    mongoose.connect(constants.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Connected to db');
    });
} catch (err) {
    throw err;
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
        throw e;
    });