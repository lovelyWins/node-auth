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
    } catch (e) {
        console.log(e)
        res.status(400).send({ "message": e.message })
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
        const id = req.user._id
        const user = await Users.findById(id)
        // matching if password is correct
        const isCorrectPass = await bcrypt.compare(req.body.currentPassword, user.password)
        if (!isCorrectPass) {
            throw new Error('Please enter valid Password')
        }

        // cheking if new password is equal to currrentPassword
        if (req.body.newPassword === req.body.currentPassword) {
            throw new Error("New password should not be same as current password")
        }

        // checking if new password and confirm password are equal
        if (req.body.newPassword === req.body.confirmPassword) {
            const encryptedPassword = await bcrypt.hash(req.body.newPassword, 8)
            await Users.findByIdAndUpdate(id, { password: encryptedPassword })
            res.send({ message: 'Password successfully changed' })
        } else {
            throw new Error("New password and confirm password did not matched")
        }

    } catch (e) {
        res.status(400).send({ "message": e.message })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updatePassword
}