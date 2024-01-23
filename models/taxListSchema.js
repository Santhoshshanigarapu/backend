const mongoose = require('mongoose');

const taxListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: String,
    },
    id: {
        type: String,
    }
},
    { timestamps: false, versionKey: false });
const TaxList = mongoose.model('TaxList', taxListSchema);
module.exports = TaxList;