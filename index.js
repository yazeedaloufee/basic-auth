const server = require('./src/server.js');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{server.start(process.env.PORT)})
.catch((e)=>{
    console.log('connection error',e.message);

}

)
