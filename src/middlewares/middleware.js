exports.middleware = (req,res,next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    
    next()
}

exports.checkCsrfToken = (err,req,res,next) => {
    if (err) {
        console.log(err)
        return res.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res,next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login')
    next()
}