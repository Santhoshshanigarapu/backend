const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    image: {
        data:Buffer,
        contentType: String
    },
},
   {
     timestamps:true
   }
);

const uploads = mongoose.model('uploads', imageSchema);
module.exports = uploads;