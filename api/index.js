var api = require('raml-mocker-server')

var callback = function (app) {
    console.log('Welcome to RAML mock server: Post to /image, GET from /image/{name}')
}

var options = {
    port: 3001,
    files: ['./api/docs.raml'],
    path: null,
    debug: true
}

api(options, callback)
