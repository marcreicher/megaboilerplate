var mongoose = require('mongoose');

var User = mongoose.Schema({
    name: String
});

module.exports = User;