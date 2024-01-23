const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
    }
});
const TicketsSchema = mongoose.model('TicketsSchema', topicSchema);
module.exports = TicketsSchema ;

