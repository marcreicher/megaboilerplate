var crypto = require('crypto'),
    config = require('config');

module.exports.encrypt = function(string, encryptionKey, callback){
    var cipher = crypto.createCipher('aes192', encryptionKey)
    var crypted = cipher.update(string, 'utf8', 'hex')
    crypted += cipher.final('hex');
    callback(null, crypted);
}
 
module.exports.decrypt = function(string, encryptionKey, callback){
    var decipher = crypto.createDecipher('aes192', encryptionKey)
    var decrypted = decipher.update(string, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    callback(null, decrypted);
}
