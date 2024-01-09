const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/adminAuth')
const adminauth = require('../midileware/adminAuth')


router.route('/').get(adminauth.isAdmin,admincontroller.showLogin);
router.route('/login').get(adminauth.isAdmin,admincontroller.showLogin)
router.route('/login').post(admincontroller.login)
router.route('/logout').get(admincontroller.logout)


module.exports = router