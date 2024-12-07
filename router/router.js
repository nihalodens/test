const express = require('express')
const userController = require('../controller/userController')
const authenticate = require('../middleWare/authenthication')

const router = new express.Router()

// register - post
router.post('/register',userController.RegisterController)

// login -post
router.post('/login',userController.LoginController)

// all users
router.get('/all-users',authenticate,userController.allUsers)



module.exports = router