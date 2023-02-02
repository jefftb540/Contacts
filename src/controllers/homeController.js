exports.home = (req, res) => {
    if(!req.session.user) return res.redirect("/login")
    res.render("index.ejs")
}

exports.postHome = (req, res) => {
    res.send(req.body.nome)
} 