const fs = require('fs')
const superagent = require('superagent')
const util = require('util')
const { handleError } = require('./Handlers')

//////////////////////////////////
// Callback hell example
/* fs.readFile('./txt/dog.txt', 'utf-8', (err, breed) => {
  handleError(err)
  console.log(`Breed read from file is: ${breed}`)
  superagent
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .end((err, res) => {
      handleError(err)

      fs.writeFile('./txt/dog-img.txt', res.body.message, (err) => {
        handleError(err)
        console.log(
          `File has be written with random image of the dog breed: ${breed}`
        )
      })
    })
}) */

/////////////////////////////
// Use Promises : use the .then(res) and .catch(err) fns on the promise
/* fs.readFile('./txt/dog.txt', 'utf-8', (err, breed) => {
  handleError(err)
  console.log(`Breed read from file is: ${breed}`)
  superagent
    .get(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(value => handleDogImage(value.body.message, breed))
    .catch(reason => handleError(reason))
})

const handleDogImage = (dogImage, breed) => {
  fs.writeFile('./txt/dog-img.txt', dogImage, (err) => {
    handleError(err)
    console.log(
      `File has be written with random image of the dog breed: ${breed}`
    )
  })
}  */

///////////////////////////////
// Use Promise to promisify readfile, writefile

/* const readFilePromise = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
const writeFilePromise = (file, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })

readFilePromise('./txt/dog.txt')
  .then((breed) => {
    console.log(`Breed read from file is: ${breed}`)
    superagent
      .get(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((value) => handleDogImage(value.body.message, breed))
      .catch((reason) => handleError(reason))
  })
  .catch((reason) => handleError(reason))

const handleDogImage = (dogImage, breed) => {
  writeFilePromise('./txt/dog-img.txt', dogImage)
    .then(() =>
      console.log(
        `File has be written with random image of the dog breed: ${breed}`
      )
    )
    .catch((reason) => handleError(reason))
} */

///////////////////////////////////
// use util.promisify
/* const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)

readFilePromise('./txt/dog.txt', 'utf-8')
  .then((breed) => {
    console.log(`Breed read from file is: ${breed}`)
    superagent
      .get(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((value) => handleDogImage(value.body.message, breed))
      .catch((reason) => handleError(reason))
  })
  .catch((reason) => handleError(reason))

const handleDogImage = (dogImage, breed) => {
  writeFilePromise('./txt/dog-img.txt', dogImage)
    .then(() =>
      console.log(
        `File has be written with random image of the dog breed: ${breed}`
      )
    )
    .catch((reason) => handleError(reason))
}  */

//////////////////////////
// Chain callbacks : triangular code to straight line code !!
/* const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)

readFilePromise('./txt/dog.txt', 'utf-8')
  .then((breed) => {
    console.log(`Breed read from file is: ${breed}`)
    return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`)
  })
  .then((value) => writeFilePromise('./txt/dog-img.txt', value.body.message))
  .then(() =>
    console.log(
      `File has be written with random image of the dog breed`
    )
  )
  .catch((reason) => handleError(reason)) 
*/

//////////////////////////////
// Use Async/Await to solve callback hell
// Syntatic Sugar for Promises
/* const getDogImage = async () => {
  try {
    const readFilePromise = util.promisify(fs.readFile)
    const writeFilePromise = util.promisify(fs.writeFile)
    const breed = await readFilePromise('./txt/dog.txt', 'utf-8')
    console.log(`Breed read from file is: ${breed}`)

    const value = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )
    console.log(value.body.message)

    await writeFilePromise('./txt/dog-img.txt', value.body.message)
  } catch (error) {
    handleError(error)
  }
}

getDogImage() */

////////////////////////////
// Understanding return values from async function
// reading values back from async function
// invoking an async function using IIFE
const getDogImage = async () => {
  try {
    const readFilePromise = util.promisify(fs.readFile)
    const writeFilePromise = util.promisify(fs.writeFile)
    const breed = await readFilePromise('./txt/dog.txt', 'utf-8')
    console.log(`Breed read from file is: ${breed}`)

    const value = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    )
    console.log(value.body.message)

    await writeFilePromise('./txt/dog-img.txt', value.body.message)
  } catch (error) {
    handleError(error)
  }
  return 'The dog value is now available!!'
}

// an async function returns a promise !!
/*  const dogValue = getDogImage()
    console.log(dogValue) // Promise { <pending> } */

// reading a return value from an async function by resolving the promise
/*  getDogImage()
    .then(res => console.log(res))
    .catch(err => console.error(err)) */

// avoid the callback by using a IIFE
/* (async () => {
  console.log('1')
  const res = await getDogImage()
  console.log('2')
  console.log(res)
})() */

/////////////////////
// waiting for multiple promises

const getDogImages = async () => {
  const breed = 'labrador'

  /*   const {body : {message: msg}} = await superagent.get(
    `https://dog.ceo/api/breed/${breed}/images/random`
  )
  console.log(msg)

  const {body : {message : msg1}} = await superagent.get(
    `https://dog.ceo/api/breed/${breed}/images/random`
  )
  console.log(msg1)

  const {body : {message: msg2}} = await superagent.get(
    `https://dog.ceo/api/breed/${breed}/images/random`
  )
  console.log(msg2) */

  // returns array of promises
  const dogImageResponse = await Promise.all([
    superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`),
    superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`),
    superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`),
  ])
  // fetch the body.message from each response
  const dogImages = dogImageResponse.map(el => el.body.message)

  console.log(dogImages)
}
// Showcase of using await Promise.all()
getDogImages()

