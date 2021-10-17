const express = require('express')
const router = express.Router()

const controller = require('../controllers')

router.post('/rate', controller.getQuoteRate)
router.post('/order', controller.postOrder)
router.get('/order/:id', controller.getOrderStatus)
router.get('/all_orders', controller.allOrders)

module.exports = router