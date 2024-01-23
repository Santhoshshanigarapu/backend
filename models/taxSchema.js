const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    period: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    },
    percentage: {
        type: String,
    },
},
    { timestamps: true, versionKey: false });

const Tax = mongoose.model('Tax', taxSchema);
module.exports = Tax;