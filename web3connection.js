const Web3 = require('web3');
const http = require('http');
// Infura connection
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/7775d2e9216a4b4c8202d22c810dad3f")); 
module.exports = web3;
