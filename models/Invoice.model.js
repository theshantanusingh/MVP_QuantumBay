const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      enum: ['USD', 'EUR', 'INR'], 
      default: 'USD',
      required: true
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ['draft', 'sent', 'paid', 'cancelled'], 
      default: 'draft'
    },

    forWhat: {
      type: String,
      trim: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;