const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    }
});
const AdminSchema = mongoose.model('AdminSchema', adminSchema);
module.exports = AdminSchema ;
