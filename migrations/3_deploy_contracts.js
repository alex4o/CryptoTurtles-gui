//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
//var FlinnCoin = artifacts.require('./FlinnCoin.sol');

//var FlinnCoinSale = artifacts.require('./FlinnCoinSale.sol');

var Listen = artifacts.require('./TurtleData.sol');

module.exports = function(deployer) {

  const startBlock = web3.eth.blockNumber + 2; // blockchain block number where the crowdsale will commence. Here I just taking the current block that the contract and setting that the crowdsale starts two block after
  const endBlock = startBlock + 300;  // blockchain block number where it will end. 300 is little over an hour.
  const rate = new web3.BigNumber(1000); // rate of ether to Gustavo Coin in wei
  const wallet = web3.eth.accounts[0];	
  const cap = web3.toWei(1000, "ether");

  //const address = 0x155aa299e29abe2ddbe5dced4c051f8f5268c0a9;

  //deployer.deploy(FlinnCoinSale, startBlock, endBlock, rate, wallet, cap);

  deployer.deploy(Listen);
};
