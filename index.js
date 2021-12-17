const express = require('express')
const { render } = require('pug')
const bodyParser = require('body-parser') 
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')

const authMiddleware = require('./middlewares/auth.middleware')

const port = 3000
const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index')
})

app.use('/users', authMiddleware.authRequire, userRoute)
app.use('/auth', authRoute)

app.listen(3000, ()=>{
    console.log('Server listening on port '+port)
})