const express = require('express')

const controller = require('../controller/products.controller')

const router = express.Router()

router.get('/', controller.viewProducts)


module.exports = router