const express = require('express');
const transactionRoute = express.Router();
const web3 = require('../web3connect');
const resFormat = require('../resFormat');
const query = require("../web3functions");
//transaction input for account transfers
const Acc_Trans = "0x";
//transaction input for Erc20 token transfers
const Erc20_Trans = "0xa9059cbb";


transactionRoute.get('/',(req,res) => {
  res.send('Place your transaction ID at the end of this url ');
});

transactionRoute.get('/:transactionid', (req,res) => {
  const transactionID = req.params.transactionid;
  //Using Infura API to query mainnet ETH
  query.checkTransaction(transactionID)
   .then(transaction => {
     query.getReceipt(transactionID)
      .then(receipt => {
        if(transaction.to)
        {
          if(transaction.input===Acc_Trans)
          {
            res.send(resFormat.accountEthTransfer(transaction,receipt));
          }
          if(transaction.input.substring(0,10)===Erc20_Trans){
            res.send(resFormat.Erc20Transfer(transaction,receipt));
          }
         res.end(resFormat.contractExecution(transaction,receipt));
        }
         {
           res.end(resFormat.contractCreation(transaction,receipt));
      }
    })
    .catch(error => {
    //  console.log(error);
       throw error;
    });
  })
  .catch(error => {
    //  console.log(error);
      throw error;
    });

});
module.exports = transactionRoute;
