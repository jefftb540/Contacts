exports.home = (req, res) => {
    res.render("index.ejs", {
        title: "Home",
        pageTitle: "Inicio"
    })
}

exports.postHome = (req, res) => {
    res.send(req.body.nome)
} 