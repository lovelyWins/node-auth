const mongoose = require('mongoose')

// connecting to mongodb using mongoose
mongoose.connect('mongodb://localhost:27017/register-user-api', {
    useNewUrlParser: true,
})


// connecting to mongodb using mongoClient
// mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         throw error
//     }
//     console.log('connected to db')
// })