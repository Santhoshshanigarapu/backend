const mongoose = require('mongoose');

let loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

},
  { timestamps: true }
);
loginSchema.index({ email: 1 });
let Login = mongoose.model('Login', loginSchema);
module.exports = Login;