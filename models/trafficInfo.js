const mongoose = require('mongoose');

const trafficInfoSchema = new mongoose.Schema({
  path: {
    type: String,
  },
  referrer: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  language: [{
    type: String,
  }],
});
module.exports = mongoose.model('TrafficInfo', trafficInfoSchema);
