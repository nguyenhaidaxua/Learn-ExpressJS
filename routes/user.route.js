const express = require('express')

const controller = require('../controller/user.controller')
const validate = require('../validate/user.validate')
const router = express.Router()

router.get('/', controller.index)
router.get('/search', controller.search)
router.get('/create', controller.getCreate)

router.get('/:id', controller.viewId)

router.post('/create', validate.postCreate,controller.postCreate)

module.exports = router