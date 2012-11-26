var baseview = require('baseview')('http://127.0.0.1:8092')
var fs = require('fs');

baseview.view('backup', 'all', {limit: 10000, include_docs: true}, function(error, index) {
  var stream = fs.createWriteStream("backup.json");
  
  stream.once('open', function(fd) {
    index.rows.forEach(function(doc) {
      line = doc.doc
      if(!line.base64) {
        line.id = doc.id
        stream.write(','+JSON.stringify(line))
      }
    })
  })
})