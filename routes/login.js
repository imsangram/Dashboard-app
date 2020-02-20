const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//require('dotenv').config();
const { loginValidation } = require('../validation/validation')

router.post('/', async (req, res) => {
  try {

    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Email id doesn\'t exists');
    }
    else {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Incorrect Password');
      }
      else {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.json(token);
      }
    }

  } catch (err) {
    res.json('error occured');
  }
});

module.exports = router;