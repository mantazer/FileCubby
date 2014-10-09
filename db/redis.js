// Redis Structure:
// [tag] [origName] [hashedName]

var redis = require('redis').createClient();

exports.setList = function(tag, origName, hashedName) {
  redis.lpush(tag, hashedName, origName);
}

// exports.removeList = function() {

// }

exports.getOrigName = function(tag, callback) {
  redis.lindex(tag, 0, function(err, result) {
    if (err) {
      // handle error
    } else {
      callback(err, result);
    }
  });
}

exports.getHashedName = function(tag) {
  return redis.lindex(tag, 1);
}
