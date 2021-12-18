const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req,res) => {
    res.render('user/index', {
        users: db.get('users').value()

    })
}
module.exports.search = (req,res) => {
    const q = req.query.q
    const matchUser = db.get('users').value()
        .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

    res.render('user/index', {
        users: matchUser,
        input: q
    })
}
module.exports.getCreate = (req,res) => {
    res.render('user/createUser')
}
module.exports.postCreate = (req,res) => {
    // dung co mutate data trong req, clone no ra
    /*
    data = {}
    data.id = shortid.generate()
    data.avatar = path...
    */
    req.body.id = shortid.generate()
    // console.log(req.file) 
    //   upload/...   sai
    //   /upload/.... dung
    const path = req.file.path.replace("public", "").replace(/\\\\/g, "/")
    req.body.avatar = path
    db.get('users').push(req.body).write()  //data above
    res.redirect('/users')
}
module.exports.viewId = (req, res) => {
    const id = req.params.id
    
    const user = db.get('users').find({ id: id }).value()
    console.log(user)
    res.render('user/view', {
        user: user
    })
}