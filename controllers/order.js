const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { product, price } = req.body;
    const newOrder = new Order({ userId: req.user._id, product, price });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOrderTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const trackingSteps = [
      { step: 'Order Placed', status: 'placed' },
      { step: 'Order Confirmed', status: 'confirmed' },
      { step: 'Order Processed', status: 'processed' },
      { step: 'Ready To Ship', status: 'ready_to_ship' },
      { step: 'Out For Delivery', status: 'out_for_delivery' }
    ];

    const currentStep = trackingSteps.findIndex(step => step.status === order.status);
    const response = trackingSteps.map((step, index) => ({
      step: step.step,
      completed: index <= currentStep
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
