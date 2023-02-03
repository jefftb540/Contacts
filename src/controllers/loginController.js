
const User = require('../models/UserModel')
exports.index = (req,res) =>{
    if(req.session.user) return res.redirect('/')
    res.render('login')
}

exports.register = async function (req,res) {
    
    const user = new User(req.body)
    const userCreated = await user.register()
    if(userCreated.errors){
        req.flash('errors',userCreated.errors)
        req.session.save(function(){
            return res.redirect('/login')
        })
    }else{
        req.flash('success',"Cadastro realizado com sucesso")
        req.session.save(function(){
            return res.redirect('/')
        })
    }
    
}

exports.login = async function(req,res){
    try{
        const user = new User(req.body)
        await user.login()

        if(user.errors){
            req.flash('errors',user.errors)
            req.session.save(function(){
                return res.redirect('/login')
            })
        }else{
            req.flash('success',"Login efetuado com sucesso")
            req.session.user = user
            req.session.save(function(){
                return res.redirect('/')
            })
        }
    } catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.logout = function(req,res){
    req.session.destroy()
    res.redirect('login')
}