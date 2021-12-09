const express = require('express')
const route = express.Router()


// Lấy danh sách của users
route.get('/users',(req,res,next)=>{
    res.json({
        status:200,
        message:'Success'
    })
})
route.get('/users/:id',(req,res,next)=>{
    res.json({
        status:200,
        message:`Get user ${req.params.id} success`
    })
})
route.post('/users',(req,res,next)=>{
    res.json({
        status:200,
        message:'Create user Success'
    })
})
route.patch('/users/:id',(req,res,next)=>{
    res.json({
        status:200,
        message:`Update  ${req.params.id} success`
    })
})
route.delete('/users/:id',(req,res,next)=>{
    res.json({
        status:200,
        message:`Delete user ${req.params.id} success`
    })
})
module.exports = route