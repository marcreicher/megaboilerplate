'use strict';

var bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    SALT_ROUNDS = 10;

module.exports.generateSalt = function(callback) {
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) {
            return callback(err);
        }
        callback(null, salt);
    });
};

module.exports.hashPassword = function(password, salt, callback) {
    bcrypt.hash(password, salt, function(err, hashedPassword) {
        if(err) {
            return callback(err);
        }
        callback(null, hashedPassword);
    });
};

module.exports.compareHash = function(preHashedPassword, databasePassword, callback) {
    bcrypt.compare(preHashedPassword, databasePassword, function(err, res) {
        if(err) {
            return callback(err);
        } else if (!res) {
            return callback({message: 'invalid credentials'});
        }
        callback(null);
    });
};

module.exports.createSHA512Hash = function(string, callback) {
    return callback(null, crypto.createHash('sha512').update(string).digest('base64'));
};
