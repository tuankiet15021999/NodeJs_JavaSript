const express = require('express')
const app = express()
const UserRouter = require('./Routers/User.route')
const createError = require('http-errors')
require('dotenv').config()
const client  = require('./helper/connection_redis')
// require('./helper/connection_mongodb')
const PORT = process.env.PORT || 3000
client.set('foo','tuankiet')

client.get('foo',(err,result)=>{
    if(err) throw createError.BadRequest()

    console.log(result);
})

app.get('/',(req,res,next)=>{
    res.send('Home page')
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',UserRouter)

app.use((req,res,next)=>{
    // const error = new Error('Not Found')
    // error.status = 500
    next(createError.NotFound('this route doesn\'t exist'))
})

app.use((err,req,res,next)=>{
    res.json({
        status: err.status || 500,
        message: err.message
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})