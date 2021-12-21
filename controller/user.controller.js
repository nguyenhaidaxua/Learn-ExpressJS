const db = require('../db')
const user = require('../models/user.model')
const shortid = require('shortid')

module.exports.index = async (req,res) => {
    const userList = await user.find()
    res.render('user/index', {
        users: userList
    })
}
module.exports.search = async (req,res) => {
    const q = req.query.q
    const matchUser = await user.find({$text: {$search: q}})
    // db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

    res.render('user/index', {
        users: matchUser,
        input: q
    })
}
module.exports.getCreate = (req,res) => {
    res.render('user/createUser')
}
module.exports.postCreate = async (req,res) => {
    // dung co mutate data trong req, clone no ra
    /*
    data = {}
    data.id = shortid.generate()
    data.avatar = path...
    */
    // req.body.id = shortid.generate()
    // console.log(req.file) 
    //   upload/...   sai
    //   /upload/.... dung
    const path = req.file.path.replace("public", "").replace(/\\\\/g, "/")
    req.body.avatar = path
    const newUser = req.body
    await user.create(newUser)
    // db.get('users').push(req.body).write()  //data above
    res.redirect('/users')
}
module.exports.viewId = async (req, res) => {
    const id = req.params.id
    const matchedUser = await user.findById(id)
    
    res.render('user/view', {
        user: matchedUser
    })
}