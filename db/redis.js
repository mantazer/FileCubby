// Redis Structure:
// [tag] [origName] [hashedName]

var redis = require('redis').createClient();

exports.setList = function(tag, origName, hashedName) {
  redis.lpush(tag, hashedName, origName);
}

exports.delList = function(tag) {
  redis.del(tag);
}

exports.getOrigName = function(tag, callback) {
  redis.lindex(tag, 0, function(err, result) {
    if (err) {
      // handle error
    } else {
      callback(err, result);
    }
  });
}

exports.getHashedName = function(tag, callback) {
  return redis.lindex(tag, 1, function(err, result) {
    if (err) {
      // handle error
    } else {
      callback(err, result);
    }
  });
}
