const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')

///////////////////////////////////////
// FILES
// Synchronous or blocking code
// Read a file -> console log -> write file -> console log

/* const textInput = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textInput)

const textOutput = `this is what we know about the avocado: ${textInput}.\n Created at ${Date.now()}.`
fs.writeFileSync('./txt/output.txt',textOutput)
console.log('Wrote to file') */

// Asynchronous or non-blocking code
// Ofcourse with callback hell !!
/* fs.readFile('./txt/start.txt', 'utf-8', (err1, data1) => {
	if (err1) throw err1
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err2, data2) => {
		if (err2) throw err2
		console.log(`The data that was read is ${data2}`)
		fs.readFile(`./txt/append.txt`, 'utf-8', (err3, data3) => {
			if (err3) throw err3
			console.log(`The data that was read is ${data3}`)
			fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err4 => {
				if (err4) throw err4
				console.log('File has been written :) ') 
			})
		})
	})
})
console.log('Will read the file') */
//const hello = 'Hello world'
//console.log(hello)

//////////////////////////////////////////
// SERVER : WEB SERVER
// The following piece of code is executed only once
// using the sync function
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

let productPage = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
)
let cardTemplate = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
let overviewPage = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
)

const dataObj = JSON.parse(data)

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }))
console.log(slugs)

// every request is being made, this callback is executed
const server = http.createServer((req, res) => {
  //console.log(req.url);
  let { pathname, query } = url.parse(req.url, true)
  switch (pathname) {
    case '/':
    case '/overview':
      let cardsHtml = dataObj.map((eachData) => {
        replacedCardTemplate = cardTemplate.replace(
          /{%IMAGE%}/g,
          eachData.image
        )
        replacedCardTemplate = replacedCardTemplate.replace(
          /{%PRODUCTNAME%}/g,
          eachData.productName
        )
        replacedCardTemplate = replacedCardTemplate.replace(
          /{%ISORGANIC%}/g,
          eachData.organic ? 'Organic!' : ''
        )
        replacedCardTemplate = replacedCardTemplate.replace(
          /{%QUANTITY%}/g,
          eachData.quantity
        )
        replacedCardTemplate = replacedCardTemplate.replace(
          /{%PRICE%}/g,
          eachData.price
        )
        replacedCardTemplate = replacedCardTemplate.replace(
          /{%HREF%}/g,
          `product?id=${eachData.id}`
        )
        return replacedCardTemplate
      })
      overviewPage = overviewPage.replace(/{%CARDS%}/g, cardsHtml)
      res.writeHead(200, {
        'Content-type': 'text/html',
      })
      res.end(overviewPage)
      break
    case '/product':
      let { id } = query
      if (id === undefined) {
        id = 0
      }
      // let selectedProduct = dataObj.find(el => el.id == id)
      let selectedProduct = dataObj[id]
      replacedProductPage = productPage.replace(
        /{%IMAGE%}/g,
        selectedProduct.image
      )
      replacedProductPage = replacedProductPage.replace(
        /{%PRODUCTNAME%}/g,
        selectedProduct.productName
      )
      replacedProductPage = replacedProductPage.replace(
        /{%FROM%}/g,
        selectedProduct.from
      )
      replacedProductPage = replacedProductPage.replace(
        /{%NUTRIENTS%}/g,
        selectedProduct.nutrients
      )
      replacedProductPage = replacedProductPage.replace(
        /{%QUANTITY%}/g,
        selectedProduct.quantity
      )
      replacedProductPage = replacedProductPage.replace(
        /{%PRICE%}/g,
        selectedProduct.price
      )
      replacedProductPage = replacedProductPage.replace(
        /{%DESCRIPTION%}/g,
        selectedProduct.description
      )

      res.writeHead(200, {
        'Content-type': 'text/html',
      })
      res.end(replacedProductPage)
      break
    case '/api':
      res.writeHead(200, {
        'Content-type': 'application/json',
      })
      res.end(data)
      break
    default:
      res.writeHead(404, {
        'Content-type': 'text/html',
        'My-Own-Header': 'hello world',
      })
      res.end('<h1>Page not found!!</h1>')
  }
})
// Server is started to listen on port 8000
server.listen(8000, 'localhost', () => {
  console.log(`Server is now listening to requests at http://localhost:8000`)
})
