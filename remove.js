var fs = require('fs')
var couchbase = require('couchbase')
var baseview = require('baseview')('http://127.0.0.1:8092')
var json

var config = {
    hosts: ['127.0.0.1:8091', '127.0.0.1:9000'],
    user: 'Administrator',
    password: 'helloworld',
    bucket: 'default'
}

baseview.view('backup', 'all', {limit: 10000, include_docs: true}, function(error, index) {
  couchbase.connect(config, function(error, cb) {
    index.rows.forEach(function(doc) {
      if(doc.doc.base64) {
        cb.delete(doc.id, function(error, meta) {
          if(error)
            console.log(error, meta)
          else
            process.stdout.write('.')
        })
      }
    })
  })
})