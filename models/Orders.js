import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'Order ID is required'],
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
  },
  trackingNumber: {
    type: String,
    trim: true,
  },
  estimatedDeliveryDate: {
    type: Date,
    validate: {
      validator: (val) => val instanceof Date && !isNaN(val),
      message: 'Must be a valid date',
    },
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
