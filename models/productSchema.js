const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    inventoryStatus: {
        type: String,
        enum: ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'],
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }
},
    { timestamps: true }
);

let Product = mongoose.model('Product', productSchema);
module.exports = Product;
