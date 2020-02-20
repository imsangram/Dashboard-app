const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const { registerValidation } = require('../validation/validation')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users);
  } catch (err) {
    res.json(err);
  }
})

router.post('/', async (req, res) => {

  // Create user object and save
  try {

    // validate user data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send('Email Id exists, please use another email id');
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
        res.json({ message: `something went wrong ..${err}` });
      }
    });
  } catch (err) {
    res.json({ message: `something went wrong ..${err}` });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      res.status(404).json({
        message: 'User could not be found'
      });
    }
    res.json(user)
  } catch (err) {
    res.json({
      message: `something went wrong ..${err}`
    });
  }
})

router.delete('/:id', async (req, res) => {
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
})

router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({
      _id: req.params.id
    }, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    })
    res.json(updatedUser);
  } catch (err) {
    res.json({
      message: `something went wrong ..${err}`
    });
  }
});

module.exports = router;