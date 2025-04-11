const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(200).json(order);
};

exports.updateOrder = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};

exports.userOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};

exports.adminOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
