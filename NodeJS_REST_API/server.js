const express = require('express')
const app = express()
require('dotenv').config()
const helmet = require('helmet')
const morgan = require('morgan')
const createError = require('http-errors')
const logEvents = require('./helper/logEvents')
app.use(helmet())
app.use(morgan('common'))
const PORT = process.env.PORT || 3000

const useRouter = require('./Routers/User.Router')

app.use('/v1',useRouter)

app.use((req,res,next)=>{
    // res.status(404)
    // res.json({
    //     status:404,
    //     message:'Not found',
    //     links:{
    //         docs:'http://docs.com.api'
    //     }
    // })
    next(createError(404,'Not Found'))
})
app.use((err,req,res,next)=>{
    logEvents(err.message)
    res.status(err.status || 500)
    res.json({
        status:err.status || 500,
        message:err.message,
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})