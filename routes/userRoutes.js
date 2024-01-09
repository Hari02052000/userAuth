const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/userAuth')
const userAuth = require('../midileware/userAuth')
const multer = require('../midileware/multer')


router.route('/').get(userAuth.isuser,userControllers.showLogin);

router.route('/register').get(userAuth.isuser,userControllers.showRegister)
router.route('/login').get(userAuth.isuser,userControllers.showLogin)
router.route('/download-image').get(userControllers.download)

router.route('/register').post(multer.FileUpload,userControllers.register)
router.route('/login').post(userControllers.login)
router.route('/logout').get(userControllers.logout)
router.route('/verify-otp').post(userControllers.verifyOTP)
router.route('/resendOTP').post(userControllers.resendOTP)


module.exports = router