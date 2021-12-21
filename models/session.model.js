const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    cart: {
        productId : Number,
    }
})

const Session = mongoose.model('Session', sessionSchema,'session')

module.exports = Session