// users.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Users
let Users = new Schema({
  username: {
    type: String
  },
  paypal: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  referral: {
    type: String
  },
  money: {
    type: Number
  }
}, {
    collection: 'users'
  });

module.exports = mongoose.model('Users', Users);