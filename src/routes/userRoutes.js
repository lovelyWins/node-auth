const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')
require('../db/mongoose')
require('../models/users')

// creating router
const userRouter = new express.Router()

// getting user 
userRouter.get('/profile', auth, userController.getProfile)

// adding users
userRouter.post('/register', userController.registerUser)

// for login
userRouter.post('/login', userController.loginUser)

// update possword
userRouter.put('/users/changePassword', auth, userController.updatePassword)


module.exports = userRouter