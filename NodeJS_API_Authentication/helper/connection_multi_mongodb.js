const mongoose = require('mongoose')

function newConnection(uri){
    const conn = mongoose.createConnection(uri)

    conn.on('connected',function(){
        console.log(`Mongoose::: connected ::: ${this.name}`);
    })
    conn.on('disconnected',function(){
        console.log(`Mongoose::: disconnected ::: ${this.name}`);
    })
    conn.on('error',function(){
        console.log(`Mongoose::: error ::: ${JSON.stringify(error)}`);
    })

    process.on('SIGINT',async()=>{
        await conn.close()
        process.exit(0)
    })
    return conn
}

// tạo connection đến DB test
const testConnection = newConnection(process.env.URI_MONGODB_TEST)
const userConnection = newConnection(process.env.URI_MONGODB_USER)

module.exports = {
    testConnection,
    userConnection
}