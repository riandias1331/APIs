const errHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "An unexpected error occurred"
    });
}

module.exports = errHandler;
