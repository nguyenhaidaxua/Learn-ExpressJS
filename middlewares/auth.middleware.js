const user = require('../models/user.model')

module.exports.authRequire = async (req,res,next) =>{
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return
    }
    const id = req.signedCookies.userId
    const matchedUser = await user.findOne({id: id})
    if (!matchedUser){
        res.redirect('/auth/login')
        return
    }
    res.locals.user = matchedUser
    next()

}