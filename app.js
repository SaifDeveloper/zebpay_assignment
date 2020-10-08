const express = require('express');
const indexPath=require('./routes/index');
const transactionPath=require('./routes/transaction');
const app = express();


app.use('/',indexPath);
app.use('/eth/api/v1/transaction',transactionPath);
module.exports = app;
