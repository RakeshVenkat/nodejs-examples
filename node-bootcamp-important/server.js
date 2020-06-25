const fs = require('fs')
const server = require('http').createServer()
server.setTimeout(1000, () => {console.log('Server timeout')})
server.on('timeout', () => {console.log('Server timed out')})

// Server can set headers.
server.on('request', (req, res) => {
    res.setHeader('authentication', 'basic')
    res.setHeader('Content-type','text/html')
    res.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
})
// There can be only one response returned thou' (which is done in this listener)
server.on('request', (req, res) => {
    console.log('Received a request')
    //res.flushHeaders()
    //req.flushHeaders()
    //res.getHeaders()
    res.statusCode = 201
    res.statusMessage = 'Modified'
    res.end('Response from server')
})

server.listen(8000, '127.0.0.1', () => console.log('Server running at http://localhost:8000'))
fs.createReadStream('./txt/input.txt', )