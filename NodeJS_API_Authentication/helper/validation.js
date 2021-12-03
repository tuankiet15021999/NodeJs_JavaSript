const Joi = require('joi')

const userValidate = data =>{
    const userSchema = Joi.object({
        email: Joi.string().email().lowercase().required().pattern(new RegExp('gmail.com')),
        password: Joi.string().required().min(4).max(10)
    })

    return userSchema.validate(data)
}

module.exports = {
    userValidate
}