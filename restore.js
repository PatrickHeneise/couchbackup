var fs = require('fs')
var couchbase = require('couchbase')
var json

var config = {
    hosts: ['127.0.0.1:8091', '127.0.0.1:9000'],
    user: 'Administrator',
    password: 'helloworld',
    bucket: 'default'
}

fs.readFile('backup.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  json = JSON.parse(data)
  
  var count = 0;
  couchbase.connect(config, function(error, cb) {
    while(count < json.length) {
      var doc = json[count]
      cb.set(doc.id, JSON.stringify(doc.json), function(error, meta) {
        if(error)
          console.log(error, meta)
        else
          process.stdout.write('.')
      })
      count++;
    }
  })
})