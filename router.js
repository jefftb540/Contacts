const express = require('express')
const router = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController')
const {loginRequired} = require('./src/middlewares/middleware')

router.get('/', homeController.home);
router.post('/', homeController.postHome);
router.get('/login', loginController.index)
router.get('/logout', loginController.logout)
router.post('/login', loginController.login)
router.post('/register', loginController.register)

router.get('/contacts', loginRequired, contactController.index)
router.get('/contacts/add', loginRequired, contactController.add)
router.post('/contacts/add', loginRequired, contactController.addContact)
router.post('/contacts/edit/:id', loginRequired, contactController.editContact)
router.get('/contacts/edit/:id', loginRequired, contactController.editForm)
router.get('/contacts/delete/:id', loginRequired, contactController.deleteContact)

module.exports = router

