var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');

router.get('/', function(req, res) {
  res.render('index', { title: 'FileCubby' });
});

router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      console.log(files.file.path);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
});

router.get('/download', function(req, res) {
  console.log(req.param('code'));
  var code = req.param('code');
  res.sendfile(code)
});

module.exports = router;
