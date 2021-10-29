const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// controller func to register user
const registerUser = async (req, res) => {
    try {
        // creating users in db
        const user = await new Users(req.body)
        user.save()
        res.send("user registered")
    } catch {
        throw new Error('cannot register')
        // res.status(400).send(error)
    }
}

// for login
const loginUser = async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id.toString() }, 'secretKey')
        res.send({ token: token })
    } catch {
        res.status(400).send()
    }
}


// for profile
const getProfile = async (req, res) => {
    res.send(req.user)
}

// update password
const updatePassword = async (req, res) => {

    try {
        const user = await Users.findByCredentials(req.body.email, req.body.currentPassword)
        const id = user.id

        if (req.body.newPassword === req.body.confirmPassword) {
            // encrypting new password
            const encryptedPassword = await bcrypt.hash(req.body.newPassword, 8)
            const newUser = await Users.findByIdAndUpdate(id, { password: encryptedPassword })
        }

        res.send('user updated')
    } catch {
        res.status(400).send()
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updatePassword
}