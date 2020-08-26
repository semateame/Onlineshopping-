const express = require('express')
const router = express.Router()
const Farmer = require('../controller/farmer')

router.get('/:id', Farmer.getproducts)

router.post('/:id', Farmer.addproduct)

router.patch('/:id/:pId', Farmer.updateproducts)
router.post('/images/:id', Farmer.addimage)

router.delete('/:id/:pId', Farmer.deleteproduct)
router.get('/orders/:id', Farmer.getorders)
router.post('/orders/:id', Farmer.changeStatus)
module.exports = router