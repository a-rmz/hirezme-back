const mongoose = require('mongoose');
const uuid = require('uuid/v1');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  _id: { type: String, default: uuid },
  name: { type: String, required: true },
  url: { type: String, required: true },
  tags: [{ type: String }],
  location: {
    address: { type: String },
    city: { type: String, require: true },
    country: { type: String, require: true },
  },
});

module.exports = mongoose.model('Company', CompanySchema);
