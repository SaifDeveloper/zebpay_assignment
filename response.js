
const web3 = require('./web3connection');
const getApiResponse =()=>{
  return{
    block:{},
    outs:[],
    ins:[],
    hash:null,
    currency:"ETH",
    chain:"ETH.main",
    state:null,
    depositType:null
  }
}

exports.contractExecution = (transaction,receipt)=>{
  const result = getApiResponse();
   result.block.blockHeight = transaction.blockNumber;
   result.outs.push ({
     address:transaction.to,
     value:transaction.value,
     type:"transfer",
     coinspecific:{tracehash:transaction.hash}
   });
   result.ins.push({
     address: transaction.from,
     value:"-"+transaction.value,
     type:"transfer",
     coinspecific:{tracehash:transaction.hash}
   });
   result.hash = transaction.hash;
   result.state = receipt.status?"confirmed":"Reverted";
   result.depositType = "Contract";
   return JSON.stringify(result);
 };

 exports.accountEthTransfer = (transaction,receipt)=>{
   const result = getApiResponse();
    result.block.blockHeight = transaction.blockNumber;
    result.outs.push ({
      address:transaction.to,
      value:transaction.value
    });
    result.ins.push({
      address: transaction.from,
      value:"-"+transaction.value
    });
    result.hash = transaction.hash;
    result.state = receipt.status?"confirmed":"Reverted";
    result.depositType = "account";
    return JSON.stringify(result);
  };

  exports.Erc20Transfer = (transaction,receipt)=>{
    const result = getApiResponse();
     result.block.blockHeight = transaction.blockNumber;
     result.outs.push ({
       address:"0x"+ transaction.input.substring(34,75),
       value:parseInt(transaction.input.substring(75, 138), 16),
       type:"token",
       coinspecific:{tracehash:receipt.to}
     });
     result.ins.push({
       address:transaction.from,
       value:"-"+parseInt(transaction.input.substring(75, 138), 16),
       type:"token",
       coinspecific:{tracehash:receipt.to}
     });
     result.hash = transaction.hash;
     result.state = receipt.status?"confirmed":"Reverted";
     result.depositType = "Contract";
     return JSON.stringify(result);
   };

   exports.contractCreation = (transaction,receipt)=>{
     const result = getApiResponse();
      result.block.blockHeight = transaction.blockNumber;
      result.outs.push ({
        address:"null",
        type:"Contract Creation",
        contractAddress:receipt.contractAddress,
      });
      result.ins.push({
        from:receipt.from
      });
      result.hash = transaction.hash;
      result.state = receipt.status?"confirmed":"Reverted";
      return JSON.stringify(result);
    };
