const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { toJSON, paginate } = require('./plugins');
const { roles, workerTypes, workerStatus, genders } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Number,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: genders,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    // in AUD dollars
    dayShiftPayment: {
      type: String,
      trim: true,
      default: '20',
    },
    // in AUD dollars
    nightShiftPayment: {
      type: String,
      trim: true,
      default: '25',
    },
    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },
    abn: {
      type: String,
      required: true,
      trim: true,
    },
    nameOfBank: {
      type: String,
      required: true,
      trim: true,
    },
    bsb: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    dob: {
      type: Date,
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: workerTypes,
      default: 'Car Cleaner',
    },
    role: {
      type: String,
      enum: roles,
      default: 'Worker',
    },
    status: {
      type: String,
      enum: workerStatus,
      default: 'Pending',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
