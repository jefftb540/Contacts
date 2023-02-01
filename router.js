const express = require('express')
const router = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')


router.get('/', homeController.home);
router.post('/', homeController.postHome);
router.get('/login', loginController.index)
router.post('/login', loginController.login)
router.post('/register', loginController.register)

module.exports = router

