const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  _id:{
    type: String
  },
  name: {
    type: String
  },
  userName: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('users', User)
