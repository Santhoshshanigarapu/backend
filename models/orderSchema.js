// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     id: {
//         type: Number
//     },
//     custName: {
//         type: String,
//     },
//     mobile: {
//         type: Number,
//     },
//     itemsList: [
//         {
//             productName: {
//                 type: String,
//             },
//             quantity: {
//                 type: Number,
//             },
//             price: {
//                 type: Number,
//             },
//             tax: {
//                 type: Number,
//             },
//             amount: {
//                 type: Number,
//             },
//         }
//     ]
// },
//     { timestamps: true, versionKey: false }
// );


// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    custName: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    itemsList: [
        {
            productName: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
            tax: {
                type: Number,
            },
            amount: {
                type: Number,
            },
        }
    ]
},
    { timestamps: true, versionKey: false }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
