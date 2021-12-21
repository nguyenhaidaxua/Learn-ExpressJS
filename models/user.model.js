const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: {type: String,text: true},
    avatar: String,
    phone: String
})

const User = mongoose.model('User', userSchema,'users')

module.exports = User