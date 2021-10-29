const express = require('express')
const userRouter = require('./userRoutes')
const mainRouter = express.Router()


// routes
mainRouter.use('/', userRouter)

module.exports = mainRouter
