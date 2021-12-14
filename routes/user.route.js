const express = require('express')
const shortid = require('shortid')
const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('user/index', {
        users: db.get('users').value()

    })
})
router.get('/search', (req, res) => {
    const q = req.query.q
    const matchUser = db.get('users').value()
        .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

    res.render('user/index', {
        users: matchUser,
        input: q
    })
})
router.get('/create', (req, res) => {
    res.render('user/createUser')
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    const user = db.get('users').find({ id: id }).value()
    res.render('user/view', {
        user: user
    })
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate()
    db.get('users').push(req.body).write()
    res.redirect('/users')
})

module.exports = router