
const Contact = require("../models/ContactModel")

exports.home = async function(req, res){
    if(!req.session.user) return res.redirect("/login")
    const contacts = await Contact.getAll()
    res.render("index.ejs", {contacts})
}

exports.postHome = (req, res) => {
    res.send(req.body.nome)
} 