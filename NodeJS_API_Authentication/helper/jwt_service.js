const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client  = require('../helper/connection_redis')
const signAccessToken = async (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '1m'
        }
        JWT.sign(payload,secret,options,(err,token)=>{
            if(err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req,res,next)=>{
    if(!req.headers['authorization']){
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            if(err.name === 'JsonWebTokenError'){
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }
        req.payload = payload
        next()
    })
}


const refreshAccessToken =  async (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            userId
        }
        const secret = process.env.REFRESH_TOLEN_SECRET
        const options = {
            expiresIn: '1h'
        }
        JWT.sign(payload,secret,options,(err,token)=>{
            if(err) reject(err)
            client.set(userId.toString(),token,{'EX':60*60}).then((reply)=>{
                resolve(token)
            }).catch(err=>{
                return reject(createError.InternalServerError())
            })         
        })
    })
}

const verifyRefreshAccessToken = async (refreshToken) =>{
    return new Promise((resolve,reject)=>{
        JWT.verify(refreshToken,process.env.REFRESH_TOLEN_SECRET,(err,payload)=>{
            if(err) reject(err)
            client.get(payload.userId).then((reply)=>{
                if(refreshToken === reply){
                    resolve(payload)
                }
                return reject(createError.Unauthorized())
            }).catch((err)=>{
                return reject(createError.InternalServerError())
            })
        })
    })
}
module.exports = {
    signAccessToken,
    verifyAccessToken,
    refreshAccessToken,
    verifyRefreshAccessToken
}