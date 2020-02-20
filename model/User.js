const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    max: 20
  },
  lastName: {
    type: String,
    require: true,
    max: 20
  },
  email: {
    type: String,
    require: true,
    min: 6,
    max: 20
  },
  password: {
    type: String,
    require: true,
    max: 100
  },
  dateOfBirth: {
    type: Date
  }
});

module.exports = mongoose.model('Users', userSchema);