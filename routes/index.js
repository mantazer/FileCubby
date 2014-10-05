// todo
// redis (maintain orig filename)
// encryption (expensive on client)
// cron wipe

var chance = require('chance').Chance();
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
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
      // Use redis to map actual filenames to tags
      var tag = chance.word({length: 5});
      fs.rename(files.file.path, uploadDir + '/' + tag, function(err) {
        console.log('Unable to rename file', err);
      });
      res.send(tag);
      // res.writeHead({'asd': 'asd'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
    });
});

router.get('/download', function(req, res) {
  console.log(req.param('code'));
  var code = req.param('code');
  var filePath = path.resolve(__dirname, '../tmp/' + code);
  console.log(filePath);
  res.sendFile(filePath);
});

module.exports = router;
