const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateOrder,
  getOrder,
  adminOrders,
  userOrders
} = require('../controllers/orderController');

router.post('/', createOrder);
router.put('/:id', updateOrder);
router.get('/:id', getOrder);
router.get('/user/order', userOrders); 
router.get('/admin/all', adminOrders); 

module.exports = router;
