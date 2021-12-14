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
    req.body.id = shortid.generate()
    const errors = []
    if (!req.body.name){
        errors.push('Name is required')
    }
    if (!req.body.phone ){
        errors.push('Phone is required')
    }
    if (isNaN(req.body.phone)){
        errors.push('Phone must be Number')
    }
    if (errors.length){
        res.render('user/createUser', {
            errors: errors,
            values: req.body
        })
        return
    }
    db.get('users').push(req.body).write()
    res.redirect('/users')
}
module.exports.viewId = (req, res) => {
    const id = req.params.id

    const user = db.get('users').find({ id: id }).value()
    res.render('user/view', {
        user: user
    })
}