const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    balance: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'closed'],
      default: 'active'
    },

    planType: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    }
  },
  { timestamps: true }
);

AccountSchema.methods.deposit = async function (amountCents) {
  if (amountCents <= 0) throw new Error('Deposit amount must be positive');
  this.balance += amountCents;
  await this.save();
  return this.balance;
};

AccountSchema.methods.withdraw = async function (amountCents) {
  if (amountCents <= 0) throw new Error('Withdraw amount must be positive');
  if (this.balance < amountCents) throw new Error('Insufficient balance');
  this.balance -= amountCents;
  await this.save();
  return this.balance;
};

AccountSchema.virtual('balanceFormatted').get(function () {
  return (this.balance / 100).toFixed(2);
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;