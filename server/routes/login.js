'use strict';

var express = require('express'),
    router = express.Router(),
    User = require('../database/schema').User,
    hashingUtilities = require('../utilities/hashing'),
    encryptionUtilities = require('../utilities/encryption'),
    config = require('config'),
    globalPepper = config.get('globalPepper'),
    async = require('async');

router.post('/login', function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    async.auto({
        findUser: function(callback) {
            User.findOne({ username: username }, function(err, user) {
                if(err) {
                    return callback(err);
                } else if (!user) {
                    return callback({message: 'user does not exist'});
                }
                callback(null, user);
            });
        },
        performInitialHash: ['findUser', function(results, callback) {
            hashingUtilities.createSHA512Hash(password, callback);
        }],
        decryptDatabasePassword: ['findUser', function(results, callback) {
            var databasePassword = results.findUser.password;
            encryptionUtilities.decrypt(databasePassword, globalPepper, callback);
        }],
        performFinalHashAndCompare: ['performInitialHash', 'decryptDatabasePassword', function(results, callback) {
            var decryptedDatabasePassword = results.decryptDatabasePassword,
                initiallyHashedPassword = results.performInitialHash;

            hashingUtilities.compareHash(initiallyHashedPassword, decryptedDatabasePassword, callback);
        }]
    }, function finished(err, results) {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.status(200).json(results.findUser);
    });
});


router.post('/signup', function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    async.auto({
        checkForExistingUsername: function(callback) {
            User.findOne({ username: username }, function(err, user) {
                if(err) {
                    return callback(err);
                } else if (user) {
                    return callback({message: 'user already exists'});
                }
                callback(null);
            });
        },
        generateSalt: ['checkForExistingUsername', function(results, callback) {
            hashingUtilities.generateSalt(callback);
        }],
        performInitialHash: ['checkForExistingUsername', function(results, callback) {
            hashingUtilities.createSHA512Hash(password, callback);
        }],
        performFinalHash: ['generateSalt', 'performInitialHash', function(results, callback) {
            var salt = results.generateSalt,
                initiallyHashedPassword = results.performInitialHash;
            hashingUtilities.hashPassword(initiallyHashedPassword, salt, callback);
        }],
        applyPepper: ['performFinalHash', function(results, callback) {
            var hashedPassword = results.performFinalHash;

            encryptionUtilities.encrypt(hashedPassword, globalPepper, callback);
        }],
        saveUser: ['applyPepper', function(results, callback) {
            var pepperedPassword = results.applyPepper,
                newUser = {
                    username: username,
                    password: pepperedPassword
                };
            User.create(newUser, function(err, user) {
                if(err) {
                    return callback(err);
                }
                return callback(null, user);
            });
        }]
    }, function finished(err, results) {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.status(200).json(results.saveUser);
    });
});

module.exports = router;





