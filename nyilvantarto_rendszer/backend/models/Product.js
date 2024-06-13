const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
  name: {
    type: String
  },
  amount: {
    type: Number
  },
  unit: {
    type: String
  },
  limit: {
    type: Date
  }
}, {
  collection: 'products'
})

module.exports = mongoose.model('Product', Product)
