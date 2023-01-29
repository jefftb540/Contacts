exports.middleware = (req,res,next) => {
    console.log("At middleware")
    
    next()
}

exports.checkCsrfToken = (err,req,res,next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('404', {pageTitle: "Erro"})
    }
    next()
}

exports.csrfMiddleware = (req, res,next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}