// Showcase of module.exports
// Use module.exports to export one variable

/* class Calculator {
  add(a, b) {
    return a + b
  }
  multiply(a, b) {
    return a * b
  }
  divide(a, b) {
    return a / b
  }
}

module.exports = Calculator */

///////////////
// Consize way of writing a module
module.exports = class {
  add(a, b) {
    return a + b
  }
  multiply(a, b) {
    return a * b
  }
  divide(a, b) {
    return a / b
  }
}
