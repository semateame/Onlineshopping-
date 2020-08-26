const express = require('express')
const router = express.Router()
const auth = require('../controller/auth')

router.post('/signup', auth.Signup)
router.post('/signin', auth.login)

module.exports = router