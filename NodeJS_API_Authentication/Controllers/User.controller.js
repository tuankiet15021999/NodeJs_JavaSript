
const User = require('../Models/User.model')
const {userValidate} = require('../helper/validation')
const {signAccessToken,refreshAccessToken,verifyRefreshAccessToken} = require('../helper/jwt_service')
const createError = require('http-errors')
const client = require('../helper/connection_redis')
module.exports = {
    register:async (req,res,next)=>{
        try{    
            const {email,password} = req.body
            const {error} = userValidate(req.body)
            // console.log('lỗi',error);
            if(error){
               throw createError(error.details[0].message)
            }
            const isExist = await User.findOne({
                username: email
            })
            if(isExist){
                throw createError.Conflict(`${email} has been register`)
            }
            const user = new User({
                email,
                password
            })
            const saveUser = await user.save()
            return res.json({
                status:"OK",
                element:saveUser
            })
        }
        catch (error){
           next(error)
        }
    },
    refreshToken:async (req,res,next)=>{
        try {
            console.log(req.body);
            const {refreshToken} = req.body
            if(!refreshToken) throw createError.BadRequest()
            const {userId} = await verifyRefreshAccessToken(refreshToken)
            console.log(userId);
            const accessToken = await signAccessToken(userId)
            const refAccessToken = await refreshAccessToken(userId)
            res.json({
                accessToken,
                refAccessToken
            })
    
        } catch (error) {
            next(error)
        }
    },
    login:async (req,res,next)=>{
        try{
            const {email,password} = req.body
            const {error} = userValidate(req.body)
            // console.log('lỗi',error);
            if(error){
               throw createError(error.details[0].message)
            }
            const emailUser = await User.findOne({email})
            if(!emailUser){
                throw createError.NotFound('User is not registered')
            }
            const isValid = await emailUser.isCheckPassword(password)
            if(!isValid){
                throw createError.Unauthorized('Password is not correct')
            }
            const accessToken = await signAccessToken(emailUser._id)
            const refAccessToken = await refreshAccessToken(emailUser._id)
            res.json({
                accessToken,
                refAccessToken
            })
            // console.log(isValid);
        }
        catch(err){
            next(err)
        }
    },
    logout:async (req,res,next)=>{
        try{
            const {refreshToken} = req.body
            console.log(refreshToken);
            if(!refreshToken) throw createError.BadRequest()
            const {userId} = await verifyRefreshAccessToken(refreshToken)
            client.del(userId.toString()).then((reply)=>{
                res.json({
                    message:'Logout'
                })
            }).catch((err)=>{
                    throw createError.InternalServerError()
            })
        }
        catch(err){
            next(err)
        }
    },
    getLists:async (req,res,next)=>{
        console.log(req.headers);
        const listUsers = [
            {
                email: 'abc@gmail.com',
            },   
            {
                email: 'haha@gmail.com'
            }]
        res.json({
            listUsers
        })
    }
}