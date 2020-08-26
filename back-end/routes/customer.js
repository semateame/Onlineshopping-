const express = require('express')
const router = express.Router()
const Customer = require("../controller/customer")
const custAuth = require("../middleware/customerAuth")

router.get('/customers/farmers',custAuth ,Customer.getfarmers)

router.get('/customers/farmers/:id', custAuth,Customer.getfarmProducts)

router.post('/customers/:id',custAuth,Customer.addtoCart)

router.get('/customers/:id',custAuth,Customer.getCart)

router.patch('/customers/:id',custAuth,Customer.resetCart)

router.post('/customers/orders/:id',custAuth, Customer.makeorder)

router.get('/customers/orders/:id/:usrId',custAuth,Customer.orderhistory)

router.patch('/customers',custAuth,Customer.rate)

module.exports = router