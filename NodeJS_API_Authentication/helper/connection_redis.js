const redis = require('redis')
const client = redis.createClient({
    port:6379,
    localhost:'127.0.0.1'
})
client.connect()
client.ping().then((pong)=>{
    console.log(pong);
})
client.on('connect',function(err){
    console.log("connected");
})
module.exports = client