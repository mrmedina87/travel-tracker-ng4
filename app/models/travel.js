var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TravelSchema = new Schema( {
  destination: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Travel', TravelSchema);