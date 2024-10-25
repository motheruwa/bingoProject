const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    balance: {
      type: Number, // Assuming the image field stores the filenames
      required: true
    },
    permission: {
      type: String,
      required: true
  }
  });

  // static signup method
  userSchema.statics.signup = async function (userName, password, balance, permission) {
    try {
        // Check for internet connectivity

        // Validation
        const missingFields = [];
        if (!userName) {
            missingFields.push('userName');
        }
        if (!password) {
            missingFields.push('password');
        }
        if (!balance) {
            missingFields.push('balance');
        }

        if (missingFields.length > 0) {
            throw new Error(`Missing fields: ${missingFields.join(', ')}`);
        }

        const exists = await this.findOne({ userName });
        if (exists) {
            throw new Error('Email already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ userName, password: hash, balance, permission});
        return user;
    } catch (error) {
        console.error('Error in user signup:', error.message);
        throw error;
    }
};

  userSchema.statics.login = async function (userName, password) {
    if (!userName || !password) {
      throw Error('All fields must be filled');
    }
    const user = await this.findOne({ userName });
    if (!user) {
      throw Error('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Incorrect password');
    }
    return user;
  };

module.exports = mongoose.model('User', userSchema);
