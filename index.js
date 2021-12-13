const express = require('express')
const { render } = require('pug')
const app = express()
const bodyParser = require('body-parser') 
const low = require('lowdb')
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
db = low(adapter)
// Set some defaults
db.defaults({ users: [] })
    .write()
const port = 3000
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('index')
})



app.get('/users', (req, res) => {
    res.render('user/index', {
        users: db.get('users').value()
        
    })
})
app.get('/users/search', (req,res) => {
    const q = req.query.q 
    const matchUser = db.get('users').value()
    .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    
    res.render('user/index', {
        users: matchUser,
        input: q
    })
})
app.get('/users/create', (req,res) => {
    res.render('user/createUser') 
})

app.get('/users/:id', (req,res) => {
    const id = req.params.id

    const user = db.get('users').find({id : id}).value()
    res.render('user/view', {
        user: user
    })
})

app.post('/users/create', (req,res) => {
    req.body.id = shortid.generate()
    db.get('users').push(req.body).write()
    res.redirect('/users')
})
app.listen(3000, ()=>{
    console.log('Server listening on port '+port)
})