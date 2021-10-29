const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// controller func to register user
const registerUser = async (req, res) => {
    try {
        // creating users in db
        const user = await new Users(req.body)
        user.save()
        res.send({ message: "user registered" })
    } catch {
        throw new Error({ message: 'cannot register' })
    }
}

// for login
const loginUser = async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id.toString() }, 'secretKey')
        res.send({ token: token })
    } catch {
        res.status(400).send({ message: "cannot login " })
    }
}


// for profile
const getProfile = async (req, res) => {

    try {
        res.send(req.user)
    } catch {
        res.status(400).send({ message: "cannot get profile" })
    }

}

// update password
const updatePassword = async (req, res) => {

    try {
        const id = req.user._id.toString()

        if (req.body.newPassword === req.body.currentPassword) {
            throw new Error()
        }

        if (req.body.newPassword === req.body.confirmPassword) {
            const encryptedPassword = await bcrypt.hash(req.body.newPassword, 8)
            await Users.findByIdAndUpdate(id, { password: encryptedPassword })
            res.send({ message: 'user updated' })
        }

    } catch (e) {
        res.status(400).send({ message: "updatation failed" })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updatePassword
}