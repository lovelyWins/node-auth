const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true,
        validate(value) {
            if (!(value.toString().length === 10)) {
                throw new Error('invalid phone !!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email !!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error('password should contain atleast 8 characters')
            }
        }
    }
})



userSchema.statics.findByCredentials = async (email, password) => {
    // finding if email provided is present in db
    
    const user = await Users.findOne({ email })
    // if user doesn't exists
    if (!user) {
        throw new Error('login failed !!')
    }

    // comparing passwords
    const isCorrectPass = await bcrypt.compare(password, user.password)

    if (!isCorrectPass) {
        throw new Error('login failed !!')
    }

    return user
}




// creating middleware which will run before saving user -----(pre)
userSchema.pre('save', async function (next) {
    // using normal function because arrow function can't bind this
    // here this is "individual user" that is about to be saved

    this.password = await bcrypt.hash(this.password, 8)
    next()

})
const Users = mongoose.model('Users', userSchema)




// exporting 
module.exports = Users