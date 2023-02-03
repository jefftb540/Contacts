
const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render("contact.ejs")
}

exports.add = (req,res)=>{
    res.render("addContact.ejs", {contact:{}} )
}

exports.addContact = async function(req,res){
    
    const contact = new Contact(req.body)
    const contactCreated = await contact.create()
    if(contactCreated.errors){
        
        req.flash('errors',contactCreated.errors)
        req.session.save(function(){
            return res.redirect('/contacts/add')
        })
    }else{
        req.flash('success',"Cadastro realizado com sucesso")
        req.session.save(function(){
            return res.redirect('/')
        })
    }
    
}

exports.editForm = async function(req,res){
    try{
        const contact = await Contact.get(req.params.id)
        res.render("addContact.ejs", {contact})
    } catch (e) {
        console.log(e)
    }
}

exports.editContact = async function(req,res){
    try{
        const contact = await Contact.get(req.params.id)
        const updatedContact = await contact.updateContact(req.body)
        if(updatedContact.errors){
            req.flash('errors',updatedContact.errors)
            req.session.save(function(){
                return res.redirect('/contacts/edit/'+req.params.id)
            })
        }else{
            req.flash('success',"Contato atualizado com sucesso")
            req.session.save(function(){
                return res.redirect('/')
            })
        }
    } catch (e) {
        console.log(e)
    }

}

exports.deleteContact = async function(req,res){
    try{
        const contact = await Contact.get(req.params.id)
        contact.delete()
        req.flash('success', "Contato deletado")
        res.redirect('/')
    } catch(e){
        console.log(e)
    }
}