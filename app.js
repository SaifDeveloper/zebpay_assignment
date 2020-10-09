const express = require('express');
const http = require('http');
// const morgan = require('morgan');
const index=require('./routes/index');
const transactionPath=require('./routes/transaction');
const app = express();
const port = process.env.port || 8080;
const server =  http.createServer(app).listen(port);

app.use('/',index);
app.use('/eth/api/v1/transaction',transactionPath);


server.on('listening',()=>{
 console.log(`Serving on port ${port}`);
})
server.on('error',()=>{
   console.log(error);
})
