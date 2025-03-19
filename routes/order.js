const express = require('express');
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderTracking
} = require('../controllers/order');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.patch('/orders/:id', updateOrderStatus);
router.get('/orders/:id/tracking',  getOrderTracking);

module.exports = router;
