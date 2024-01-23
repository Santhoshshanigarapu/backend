const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String
    },
    orderId: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    totalTax: {
        type: Number
    },
    counter: {
        type: Number
    },
    invoice_date: {
        type: Date
    },
    due_date: {
        type: Date
    },
    custName: {
        type: String
    },
    mobile_no: {
        type: String
    },
    items: {
        type: [mongoose.Schema.Types.Mixed]
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid']
    },
},
    { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;