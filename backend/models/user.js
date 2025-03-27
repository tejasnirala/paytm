import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [8, 'Password must have at least 8 characters.'],
    maxLength: [80, 'Password cannot have more than 80 characters.'],
    select: false,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: false,
    maxLength: 30
  },
  accountVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateCode() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigit = Math.floor(Math.random() * 10000).toString().padStart(4, 0);
    return parseInt(firstDigit + remainingDigit);
  }

  const verificationCodeValue = generateCode();
  this.verificationCode = verificationCodeValue;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000;

  return verificationCodeValue;
}

// You can remove this method if you are not sending JWT in cookie.
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

export const User = model("User", userSchema);
