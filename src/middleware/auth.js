const jwt = require('jsonwebtoken')
const User = require('../models/users')
// auth middleware
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secretKey')
        let user = await User.findOne({ _id: decoded._id }).select({ password: 0 })
        req.user = user
    } catch (e) {
        res.status(401).send({ error: "please authenticate" })
    }

    next()
}

module.exports = auth
