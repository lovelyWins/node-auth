const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {

    try {
        console.log('auth is running')
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'secretKey')
        console.log(decoded)
        let user = await User.findOne({ _id: decoded._id }).select({ password: 0 })
        req.user = user
    } catch (e) {
        res.status(401).send({ error: "please authenticate" })
    }

    next()
}

module.exports = auth
