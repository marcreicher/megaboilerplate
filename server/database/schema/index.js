var mongoose = require('mongoose');
var UserSchema = require('./user');

module.exports.User = mongoose.model('User', UserSchema);