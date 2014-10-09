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
  redis.setList('key', 'value1', 'value2');
 
  redis.getOrigName('key', function(err, result) {
    console.log(result);
  })

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

    res.render('tag', { tag: tag });
  });
});

router.get('/download', function(req, res) {
  var tag = req.param('tag');
  var filePath = path.resolve(__dirname, '../tmp/' + tag);
  res.sendFile(filePath);
});

router.get('/test', function(req, res) {
  res.send(200);
})

module.exports = router;
