var chance = require('chance').Chance();
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var redis = require('../db/redis.js')
var util = require('util');

var router = express.Router();
var uploadDir = __dirname + '/../tmp'

router.get('/', function(req, res) {
  res.render('index', { title: 'FileCubby' });
});

router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm({ 
    uploadDir: __dirname + '/../tmp',
    keepExtensions: true
  });
  form.parse(req, function(err, fields, files) {
    
    var hashedName = path.basename(files.file.path);
    var origName = files.file.name;
    var tag = chance.word({length: 5});
    
    console.log(hashedName);
    console.log(origName);
    console.log(tag);

    redis.setList(tag, origName, hashedName);
    res.render('tag', { tag: tag });
  });
});

router.get('/download', function(req, res) {
  var tag = req.param('tag');
  redis.getHashedName(tag, function(err, result) {
    var hashedName = result;
    var filePath = path.resolve(__dirname, '../tmp/' + hashedName);
    res.sendFile(filePath);
  });
});

router.get('/test', function(req, res) {
  res.send(200);
})

module.exports = router;
