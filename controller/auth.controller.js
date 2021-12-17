const { render } = require('pug')
const db = require('../db')
module.exports.login = (req,res) => {
    res.render('auth/login')
}
module.exports.postLogin = (req,res) => {

    const userEmail = req.body.email
    const userPassword = req.body.password
    const user = db.get('users').find({ email: userEmail }).value()


    if (!user){
       res.render('auth/login',{
           errors: [
               "User does not exist",
           ],
           values : req.body
           
       })
        return
    }
    if (user.password !== userPassword){
        res.render('auth/login',{
           errors: [
               "Password is wrong",
           ],
           values : req.body
           
       })
        return
        
    }
    
    res.cookie('userId', user.id)
    
    res.redirect('/users')

}