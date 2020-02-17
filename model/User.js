const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    age: { type: Number, require: true },
    dateOfBirth: { type: Date, require: true,  default: Date.now }
});

module.exports = mongoose.model('Users',userSchema);