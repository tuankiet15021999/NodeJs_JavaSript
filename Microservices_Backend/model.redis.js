const redis = require('redis')
const client = redis.createClient({
    port:6379,
    localhost:'127.0.0.1'
})

const connect = async ()=>{
    await client.connect()
}
const get = async (key) =>{
    return new Promise((resolve,reject)=>{
        client.get(key).then((result)=>{
            resolve(result)
        }).catch((err)=> reject(err))
    })
}

const set = async (key,val) =>{
    return new Promise((resolve,reject)=>{
        client.set(key,val).then((result)=>{
            resolve(val)
        }).catch((err)=> reject(err))
    })
}

const incrby = async (key,count) =>{
    return new Promise((resolve,reject)=>{
        client.incrBy(key,count).then((result)=>{
            resolve(result)
        }).catch((err)=> reject(err))
    })
}

const decrby = async (key,count) =>{
    return new Promise((resolve,reject)=>{
        client.decrBy(key,count).then((result)=>{
            resolve(result)
        }).catch((err)=> reject(err))
    })
}

const exists = async (key) =>{
    return new Promise((resolve,reject)=>{
        client.exists(key).then((result)=>{
            resolve(result)
        }).catch((err)=> reject(err))
    })
}

const setnx = async (key,val) =>{
    return new Promise((resolve,reject)=>{
        client.setNX(key,val).then((result)=>{
            resolve(result)
        }).catch((err)=> reject(err))
    })
}

module.exports = {
    get,set,incrby,decrby,exists,setnx,connect
}