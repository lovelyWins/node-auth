const mongoose = require('mongoose')

// connecting to mongodb using mongoose
mongoose.connect('mongodb://localhost:27017/register-user-api', {
    useNewUrlParser: true,
})
