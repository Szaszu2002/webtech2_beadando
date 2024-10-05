const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Container = new Schema({
  
  name: {
    type: String
  },
  limit: {
    type: Number
  },
  user_id: {
    type: String
  },
  shared: {
    type: Array
  }
}
,{
collection: 'container'
});

module.exports = mongoose.model('Container', Container);