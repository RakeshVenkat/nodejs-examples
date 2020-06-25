exports.handleError = (error) => {
  if (error) {
    console.error(error.response.body)
    // throw error
  }
}
