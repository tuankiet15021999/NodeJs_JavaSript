const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {testConnection} = require('../helper/connection_multi_mongodb')

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
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
// xử lý trước khi save vào database
UserSchema.pre('save', async function(next){
    try{
        console.log(`Called before save::::`,this.email,this.password);
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password,salt)
        this.password = hashPassword
        next()
    }
    catch(err){
        next(err)
    }
})
// xử lý sau
UserSchema.methods.isCheckPassword = async function(password){
    try{
        return await bcrypt.compare(password,this.password)
    }
    catch(err){
        next(err)
    }
}

module.exports = testConnection.model('user',UserSchema)