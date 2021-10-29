
const errorFunc = (req, res, next) => {
    const error = new Error("not found")
    error.status = 404
    next(error)
}


// error handling
const errorHandler = (err, req, res, next) => {
    res.status(err.staus || 500).send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
}

module.exports = { errorFunc, errorHandler }