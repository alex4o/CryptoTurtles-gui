var Web3 = require('web3');
//var artifactor = require("truffle-artifactor");
 // => a promise

//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require("fs")

var td = JSON.parse(fs.readFileSync("./build/contracts/TurtleData.json"))
var st = JSON.parse(fs.readFileSync("./build/contracts/TurtleCoinSale.json"))
var tc = JSON.parse(fs.readFileSync("./build/contracts/TurtleCoin.json"))

console.log(td)

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var TurtleData = web3.eth.contract(td.abi);
var TurtleCoinSale = web3.eth.contract(st.abi);
var TurtleCoin = web3.eth.contract(tc.abi);

var data = TurtleData.at('0x4d7bd998477c9fa8e897516f58af0ef9ce227df0');
var sale = TurtleCoinSale.at('0xb4f8b30b65c6efda2d042fe65b2b6330775f23e1');


// console.log(sale)
tkn = sale.token()

var coin = TurtleCoin.at(tkn)
sale.sendTransaction({from: web3.eth.accounts[0], value: web3.toWei(2, "ether")})

data.setCommunication(tkn)




var requests = data.updateRequests({from:web3.eth.accounts[0]});
data.mintTurtle('test', 12, 34);



console.log(data.updateRequests.call({from:web3.eth.accounts[0]}));

//console.log(data.turtleName(data.Turtles.call(data.globalTurtles.call())));