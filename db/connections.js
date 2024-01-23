const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.DB_SERVER, {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=> console.log("Database connected Successfully..."))
.catch((e)=> console.log(e));