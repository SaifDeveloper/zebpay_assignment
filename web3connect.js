const Web3 = require('web3');
const http = require('http');
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/3bf428ac3746442e8ff573d4c92b56cb")); //Using Infura API service
module.exports = web3;
