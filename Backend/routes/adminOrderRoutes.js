const express = require('express');
const Order = require('../models/Order');
const {protect, admin} = require('../middleware/authMiddleware');

const router = express.Router();

// @Route GET /api/admin/orders 
// @Descr Get all orders (Admin Only)
// @access Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {   
        const orders = await Order.find({}).populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// @Route GET /api/admin/orders/:id
// @Desc Get single order by ID (Admin Only)
// @access Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @Route PUT /api/admin/orders/:id
// @Descr Update order status (Admin Only) - e.g., mark as delivered
// @access Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// @Route DELETE /api/admin/orders/:id
// @Descr Delete an order (Admin Only)
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);      
        if (order) {
            await order.deleteOne();
            res.json({ message: 'Order removed successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;