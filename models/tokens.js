const mongoose = require('mongoose');
let tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  roleId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
},
  { timestamps: true }
);

let Token = mongoose.model('Token', tokenSchema);
module.exports = Token;