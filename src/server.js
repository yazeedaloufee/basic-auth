const express = require('express');
const app = express();
const authRoutes=require('../src/routes/auth.js')
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));
app.use(authRoutes);
function start (port){
    app.listen(port,()=>{

    console.log(`app is up and running on port ${port}`)
    })
}




module.exports= {
    server:app,
    start:start
}