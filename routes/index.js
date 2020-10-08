const express = require("express");
const indexRoute = express.Router();

indexRoute.get('/',(req,res)=>{
  res.send("Url format should be=> HOST:PORT/eth/api/v1/transaction");
});

module.exports = indexRoute;
