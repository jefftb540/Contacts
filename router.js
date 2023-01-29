const express = require('express')
const router = express.Router()
const homeController = require('./src/controllers/homeController')
const contactController = require('./src/controllers/contactController')


router.get('/', homeController.home);
router.post('/', homeController.postHome);

module.exports = router

