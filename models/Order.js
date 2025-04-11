const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'User ID or Name is required']
  },
  products: [
    {
      id: {
        type: String,
        required: [true, 'Product ID is required']
      },
      name: {
        type: String,
        required: [true, 'Product name is required']
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be non-negative']
      }
    }
  ],
  payment: {
    method: {
      type: String,
      required: [true, 'Payment method is required']
    },
    paid: {
      type: Boolean,
      required: [true, 'Payment status is required']
    }
  },
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total cannot be negative']
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered','Completed','Canceled','Processing'],
    default: 'Pending',
    required: true
  },
  address: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
