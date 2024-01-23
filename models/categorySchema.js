const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    status: {
        type: String,
        enum: ["ACTIVE","BLOCK"],
        default: "ACTIVE"
    }
},
    { timestamps: true });
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;