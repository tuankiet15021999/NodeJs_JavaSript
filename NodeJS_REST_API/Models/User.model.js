const moongose = require('mongoose')
const Schema = moongose.Schema()

const UserSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        require:true,
    }
})

module.exports = moongose.model('Users',UserSchema)