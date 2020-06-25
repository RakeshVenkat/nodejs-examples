// Showcase of module.exports
// Use module.exports to export one variable
const C = require('./testModule1')
const calc1 = new C()
console.log(calc1.add(4,5))
console.log(calc1.multiply(4,5))
console.log(calc1.divide(4,5))

console.log('--------------------')

// Showcase of using exports
// use exports to export multiple variables
const { add, multiply, divide } = require('./testModule2')
console.log(add(4,5))
console.log(multiply(4,5))
console.log(divide(4,5))

console.log('--------------------')

// caching
require('./testModule3')('How are you doing?')
require('./testModule3')('Where have you been')
require('./testModule3')('whats your name?')
require('./testModule3')('This is the begining!!')
require('./testModule3')('Good bye :)')

console.log('----------------')
///////////////////////////////
// Module IFFE and args
console.log(arguments)
console.log(require('module').wrapper)