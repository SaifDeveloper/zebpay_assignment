const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = require('./app');
const port = process.env.port || 8080;
const server =  http.createServer(app).listen(port);
server.on('listening......',()=>{
 console.log(`App listening on port ${port}`);
})
server.on('error',()=>{
   console.log(error);
})
