require('dotenv').config() 
const express = require('express') 
const router = require("./router")
const path = require('path') 
const {middleware, checkCsrfToken, csrfMiddleware} =  require('./src/middlewares/middleware')
const mongoose = require('mongoose') 
const session = require('express-session') 
const MongoStore = require('connect-mongo')
const flashMessage = require('connect-flash') 
const helmet = require('helmet') 
const csrf = require('csurf') 
const { json } = require('body-parser')



mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("Database connected")
    app.emit("databaseReady")
})
.catch(e =>{
    console.log(e)
})


const app = express()

app.use(express.urlencoded({extended: true})) 
app.use(json())

app.use(express.static('./public'))

const mainSession = session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60+60*24*7,
        httpOnly: true
    }
})

app.use(mainSession)
app.use(helmet())
app.use(flashMessage())


app.set('views', path.resolve(__dirname,'src', 'views'))
app.set('view engine', 'ejs') 

app.use(csrf())
app.use(middleware)
app.use(csrfMiddleware)
app.use(checkCsrfToken)

app.use(router)

app.on('databaseReady', ()=>{
    app.listen(80,()=>{
        console.log("listening on http://localhost")
    })
})



