const mongoose = require('mongoose');
const uuid = require('uuid/v1');

const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  _id: { type: String, default: uuid },
  name: { type: String, required: true },
  url: { type: String, required: true },
  company: {
    type: String,
    ref: 'Company',
    // required: true,
  },
  tags: [{ type: String }],
  status: {
    type: String,
    required: true,
    enum: ['SENT', 'REJECTED', 'IN_PROGRESS'],
    default: 'SENT',
  },
  dateSent: { type: Date, default: Date.now, required: true },
  dateReplied: { type: Date },
  dateRejected: { type: Date },
});

module.exports = mongoose.model('Application', ApplicationSchema);
