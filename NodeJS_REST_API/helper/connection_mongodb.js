const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://localhost:27017/Ex2')

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
module.exports = conn