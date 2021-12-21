const md5 = require('md5');
const { render } = require('pug')
const user = require('../models/user.model')

module.exports.login = (req,res) => {
    res.render('auth/login')
}
module.exports.postLogin = async (req,res) => {

    const userEmail = req.body.email
    const userPassword = req.body.password
    const userAuth = await user.findOne({ 'email': userEmail})


    if (!userAuth){
       res.render('auth/login',{
           errors: [
               "User does not exist",
           ],
           values : req.body
           
       })
        return
    }
    const hashedPaswords = md5(userPassword)

    if (userAuth.password !== hashedPaswords){
        res.render('auth/login',{
           errors: [
               "Password is wrong",
           ],
           values : req.body
           
       })
        return
        
    }

    res.cookie('userId', userAuth.id,{
        signed: true
    })
    
    res.redirect('/users')

}