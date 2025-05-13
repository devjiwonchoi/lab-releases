console.log('__TESTING before:', process.env.__TESTING)

process.env.__TESTING = 'true'

console.log('__TESTING after:', process.env.__TESTING)
