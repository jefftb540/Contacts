const mongoose = require('mongoose')
const validator = require('validator')




const ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: false},
    email: {type: String, required: false},
    phone: {type: String, required: false},
    creationDate: {type: Date, default: Date.now}
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact{
    constructor(body){
        this.name = body.name
        this.lastname = body.lastname
        this.phone = body.phone
        this.email = body.email
    }

    validate(){
        const errors = []
        if(!(this.name)) errors.push("Informe o nome do contato")
        if(!(this.email || this.phone)) errors.push("Informe e-mail ou telefone")
        if(this.email && !validator.isEmail(this.email)) errors.push('Email inválido')
        if(this.phone && !validator.isMobilePhone(this.phone, 'pt-BR')) errors.push("Telefone inválido")
        return errors.length>0 ? errors : false
    }
    
    async create(){
        const errors = this.validate()
        if(!errors){
            try{
                const contactCreated = await ContactModel.create(this)
                return contactCreated
            } catch(e){
                console.log(e)
            }
        }else{
            return { errors: errors}
        }
    }

    async updateContact(updatedData){
        const contact = new Contact(updatedData)
        const errors = contact.validate()
        if(!errors){
            try{
                const updatedContact = await ContactModel.updateOne(contact)
                return updatedContact
            } catch(e){
                console.log(e)
            }
        }else{
            return { errors: errors}
        }
    }

    static async getAll() {
        return await ContactModel.find()
    }

    static async get(id) {
        const contact = new Contact(await ContactModel.findById(id))
        contact.id = id
        return contact
    }

    async delete(){
        const contact = await ContactModel.findByIdAndDelete(this.id)
        //ContactModel.de
    }
}

module.exports = Contact