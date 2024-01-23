const mongoose = require('mongoose');

let customerDetailsSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    mobile_no: {
        type: Number
    }

},
    { timestamps: true, versionKey: false }
);

const Customer = mongoose.model('Customer', customerDetailsSchema);
module.exports = Customer;