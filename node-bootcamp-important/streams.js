const fs = require('fs')
const server = require('http').createServer()
// Solution 1: read whole file into memory: 
// Takes around 20 secs to get the response for 1 GB file
/* server.on('request', (req, res) => {
    fs.readFile('./txt/dummy1GB.txt', (err, data) => {
        if (err) throw err
        res.end(data)
    })
}) */

// Solution 2: read chunks
// creates something called back pressure: when reading large files
// takes 1 second to load 1 GB file !! But doesnt load the whole file !!
/*  server.on('request', (req, res) => {
  const readable = fs.createReadStream('./txt/dummy1GB.txt')
  readable.on('data', (chunk) => {
    res.end(chunk)
  })
  readable.on('end', () => {
    res.end()
  })
  readable.on('error', (err) => {
    console.log(err)
    res.statusCode = 404
    res.end('file not found')
  })
})  */

// Solution:3
server.on('request', (req, res) => {
    fs.createReadStream('./txt/dummy1GB.txt').pipe(res)
})


server.listen(8000, 'localhost', () =>
  console.log('server running at port 8000')
)
