const express = require('express')

const route = express.Router()

route.post('/register',(req,res,next)=>{
    res.send('Register page')
})
route.post('/refresh-token',(req,res,next)=>{
    res.send('refresh-token page')
})
route.post('/login',(req,res,next)=>{
    res.send('login page')
})
route.post('/logout',(req,res,next)=>{
    res.send('logout page')
})
module.exports = route