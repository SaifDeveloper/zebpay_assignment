const express = require('express');
const indexPath=require('./path/index');
const transactionPath=require('./path/transaction');
const log = require('morgan');
const app = express();


app.use('/',indexPath);
app.use('/eth/api/v1/transaction',transactionPath);
module.exports = app;
