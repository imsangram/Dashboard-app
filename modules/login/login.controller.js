const HTTPStatus = require('http-status'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    User = require('../users/user.model'),
    { loginValidation } = require('./login.validation');

async function login(req, res) {
    try {
        const { error } = await loginValidation(req.body);
        if (error) {
            return res.status(HTTPStatus.BAD_REQUEST).send(error.details[0].message);
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(HTTPStatus.BAD_REQUEST).send('Email id doesn\'t exists');
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(HTTPStatus.BAD_REQUEST).send('Incorrect Password');
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.json(token);
        }
    } catch (err) {
        console.log(err);
        console.log(err.message);
        res.json(err);
    }
};


module.exports.login = login;