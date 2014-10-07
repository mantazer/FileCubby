// todo:
// redis (maintain orig filename)
// encryption (expensive on client)
// cron wipe
// ajax integration
// inactive gray upload button until uploaded file
// handling harmful files
// check for valid file in /upload
// strip/format tag input

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
      
      var hashedName = path.basename(files.file.path);
      var origName = files.file.name;
      var tag = chance.word({length: 5});
      
      console.log(hashedName);
      console.log(origName);
      console.log(tag);

      

      // res.writeHead({'asd': 'asd'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
    });
});

router.get('/download', function(req, res) {
  var tag = req.param('tag');
  console.log(tag);
  var filePath = path.resolve(__dirname, '../tmp/' + tag);
  console.log('filepath: ' + filePath);
  res.sendFile(filePath);
});

router.get('/test', function(req, res) {
  res.send(200);
})

module.exports = router;
