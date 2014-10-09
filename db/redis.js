// Redis Structure:
// [tag] [origName] [hashedName]

var redis = require('redis').createClient();

// exports.insertList = function(tag, origName, hashedName) {
//   redis.lpush(tag, origName, hashedName);
// }

// exports.removeList = function() {

// }

// exports.getOrigName = function(tag) {

// }

// exports.getHashedName = function(tag) {

// }