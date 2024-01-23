const mongoose = require('mongoose');

let registerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token'
  }
},
  { timestamps: true }
);
registerSchema.index({ email: 1 });

let Register = mongoose.model('Register', registerSchema);
module.exports = Register;