const mongoose = require('mongoose')
const schema = mongoose.Schema()

const {testConnection} = require('../helper/connection_multi_mongodb')
const UserSchema = new schema({
    username: {
        type: String,
        lowecase:true,
        unique: true,
        require:true,
    },
    password: {
        type: String,
        require:true,
    },
})

module.exports = testConnection.model('user',UserSchema)