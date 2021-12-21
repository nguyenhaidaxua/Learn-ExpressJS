const db = require('../db')
const shortid = require('shortid')
const Session = require('../models/session.model')

module.exports = async (req,res,next) =>{
    
    if(!req.signedCookies.sessionId){
        await Session.create({'cart': {}})
        res.cookie('sessionId',await Session.find().sort({ _id: -1 }).limit(1),{
           signed: true
        })
        
    }
    const sessionId = req.signedCookies.sessionId
    // var obj = db.get('session')
    //     .find({ id: sessionId })
    //     .get('cart')
    //     .value();
    // var totalProducts = 0;
    // if(obj){
    //     for (let [key, value] of Object.entries(obj)) {
    //         totalProducts += value;
    //     }
    // }
        
    // res.locals.items = totalProducts
    next()

}