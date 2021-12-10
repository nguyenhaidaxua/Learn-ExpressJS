const express = require('express')
const { render } = require('pug')
const app = express()
const bodyParser = require('body-parser') 

const port = 3000
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.render('index')
})

const users = [
    { id: 1, name: 'Hai' },
    { id: 2, name: 'Hao' },
    { id: 3, name: 'Giang' },
    { id: 4, name: 'Phat' }
]

app.get('/users', (req, res) => {
    res.render('user/index', {
        users: users
        
    })
})
app.get('/users/search', (req,res) => {
    const q = req.query.q 
    const matchUser = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    
    res.render('user/index', {
        users: matchUser,
        input: q
    })
})
app.get('/users/create', (req,res) => {
    res.render('user/createUser') 
})

app.post('/users/create', (req,res) => {
    users.push(req.body)
    res.redirect('/users')
})
app.listen(3000, ()=>{
    console.log('Server listening on port '+port)
})