const express = require('express');
const transactionRoute = express.Router();
const web3 = require('../web3connection');
const response = require('../response');

//transaction input for account transfers
const Account_txns = "0x";
//transaction input for Erc20 token transfers
const ERC20_txns = "0xa9059cbb";

checkTransaction = id => {
  return web3.eth.getTransaction(id);
};

getReceipt = id => {
  return web3.eth.getTransactionReceipt(id);
};


transactionRoute.get('/',(req,res) => {
  res.send('Provide txn ID after / ');
});

transactionRoute.get('/:transactionid', (req,res) => {
  const transactionID = req.params.transactionid;
  //Using Infura API to query mainnet ETH
  checkTransaction(transactionID)
   .then(transaction => {
     getReceipt(transactionID)
      .then(receipt => {
        if(transaction.to)
        {
          if(transaction.input===Account_txns)
          {
            res.send(response.accountEthTransfer(transaction,receipt));
          }
          if(transaction.input.substring(0,10)===ERC20_txns){
            res.send(response.Erc20Transfer(transaction,receipt));
          }
         res.end(response.contractExecution(transaction,receipt));
        }
         {
           res.end(response.contractCreation(transaction,receipt));
      }
    })
    .catch(error => {
       throw error;
    });
  })
  .catch(error => {
      throw error;
    });

});
module.exports = transactionRoute;
