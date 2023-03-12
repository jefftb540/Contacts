const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')



const UserSchema = new mongoose.Schema({
   email: {type: String, required: true},
   password: {type: String, required: true}
})

const UserModel = mongoose.model('User', UserSchema)

class User{
    constructor(body){
        this.email = body.email
        this.password = body.password
    }
    async login(){
        const errors = this.validate(true)
       
        if (!errors) {
            const user = await UserModel.findOne({email: this.email})
            if (!user) return {errors: ["Usuário não existe"]}

            if(! bcryptjs.compare(this.password, user.password)) return {errors: ["Senha inválida"]}
            return user



        } else return {errors: errors}

        
        I

    }
    validate(isLogin = false){
        const errors = []
        if(!validator.isEmail(this.email)) errors.push('Email inválido')
        if(this.password.length <3 || this.password.length > 50) errors.push('Senha tem que ter entre 6 e 50 caracteres')
        if (this.userExists() && !isLogin) errors.push("Usuário já cadastrado")
        return errors.length>0 ? errors : false
    }
    
    async register(){
        const errors = this.validate()
        if(!errors){
            const salt = bcryptjs.genSaltSync()
            this.password = bcryptjs.hashSync(this.password, salt)
            try{
                const userCreated = await UserModel.create(this)
                return userCreated
            } catch(e){
                console.log(e)
            }
        }else{
            return { errors: errors}
        }
    }

    async userExists(){
        const user = await UserModel.findOne({email: this.email})
        return user ? true:false
    }

}

module.exports= User