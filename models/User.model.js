const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required to setup an account"],
      trim: true,
      minlength: [2, "Name should contain at least 2 characters"],
      maxlength: [100, "Name cannot have more than 100 characters"]
    },

    firstName: {
      type: String,
      required: [true, "First Name is required to setup an account"],
      trim: true,
      minlength: [2, "First name should contain at least 2 characters"],
      maxlength: [50, "First name cannot have more than 50 characters"]
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot have more than 50 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required to setup an account"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    contactNumber: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required to setup an account"],
      trim: true,
      minlength: [6, "Password must be 6 characters long at least"],
      select: false
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.verificationToken = crypto.createHash('sha256').update(token).digest('hex');
  return token;
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;