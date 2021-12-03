const express = require('express')
const route = express.Router()
const {verifyAccessToken} = require('../helper/jwt_service')
// add vào mongoDB
const {register,refreshToken,login,logout,getLists} = require('../Controllers/User.controller')
route.post('/register',register)
route.post('/refresh-token',refreshToken)
route.post('/login',login)
route.delete('/logout',logout)
route.get('/getlists',verifyAccessToken,getLists)
module.exports = route