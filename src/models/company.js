/* eslint
  no-underscore-dangle: 0
  no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]
*/
const mongoose = require('mongoose');
const uuid = require('uuid/v1');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  _id: { type: String, default: uuid },
  name: { type: String, required: true },
  url: { type: String, required: true },
  owner: { type: String, required: true },
  tags: [{ type: String }],
  location: {
    address: { type: String },
    city: { type: String, require: true },
    country: { type: String, require: true },
  },
});

CompanySchema.set('toObject', {
  transform(_doc, ret, _options) {
    const newObj = ret;
    newObj.id = ret._id;
    delete newObj._id;
    delete newObj.__v;
    return ret;
  },
});

module.exports = mongoose.model('Company', CompanySchema);
