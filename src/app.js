const express = require('express')
const mainRouter = require('../src/routes/routes')
const errorMid = require('../src/middleware/error')

// initializing express
const app = express()

// app.use
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.use(errorMid.errorFunc)
// app.use(errorMid.errorHandler)
app.use(mainRouter)

// listening to port
app.listen(3000, (err) => {
    if (err) { throw err }
    console.log('app is runnning on 3000')
})