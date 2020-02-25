const User = require('./user.model'),
        { registerValidation } = require('../users/user.validation'),
        HTTPStatus = require('http-status'),
        bcrypt = require('bcryptjs');

const getUsers = async function (req, res) {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.json(err);
    }
}

const getUserById = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            res.status(HTTPStatus.NOT_FOUND).json({
                message: 'User could not be found'
            });
        }
        res.json(user)
    } catch (err) {
        res.json({
            message: `something went wrong ..${err.message}`
        });
    }
}

const addUser = async function (req, res) {
    try {
        // validate user data
        const { error } = registerValidation(req.body);
        if (error) return res.status(HTTPStatus.BAD_REQUEST).send(error.details[0].message);

        // check if email already exists
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(HTTPStatus.BAD_REQUEST).send('Email Id exists, please use another email id');
        }

        // hash the password 
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (!err) {
                const user = new User({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hash,
                    dateOfBirth: req.body.dateOfBirth
                });

                // save the user to db
                const savedUser = await user.save();
                res.send(savedUser);
            }
            else {
                res.json({ message: `something went wrong ..${err.message}` });
            }
        });
    } catch (err) {
        res.json({ message: `something went wrong ..${err.message}` });
    }
}

const deleteUser = async function (req, res) {

    try {
        const deletedUser = await User.remove({
            _id: req.params.id
        });
        res.json(deletedUser);
    } catch (err) {
        res.json({
            message: `something went wrong ..${err}`
        });
    }
}

const updateUser = async function (req, res) {
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.id
        }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                password: req.body.password
            }
        })
        res.json(updatedUser);
    } catch (err) {
        res.json({
            message: `something went wrong ..${err}`
        });
    }
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}