const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  employeeNames: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      //required: true
    }
  }]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

