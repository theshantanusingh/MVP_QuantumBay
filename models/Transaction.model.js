const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'transfer'],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed'
    },

    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'wallet', 'bank'],
      default: 'card'
    },

    description: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;