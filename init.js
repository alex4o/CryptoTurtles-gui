var web3 = require('web3');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))

//var artifactor = require("truffle-artifactor");
 // => a promise
// console.log(Web3)
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// console.log(Web3)


var fs = require("fs")

var td = JSON.parse(fs.readFileSync("./build/contracts/TurtleData.json"))
var st = JSON.parse(fs.readFileSync("./build/contracts/TurtleCoinSale.json"))
var tc = JSON.parse(fs.readFileSync("./build/contracts/TurtleCoin.json"))

// console.log(td)

// var web3 = Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var TurtleData = web3.eth.contract(td.abi);
var TurtleCoinSale = web3.eth.contract(st.abi);
var TurtleCoin = web3.eth.contract(tc.abi);

console.log(TurtleData)

var data = TurtleData.at('0x7b5f295c5524341544f86a7b128cb105bb027c5e');
var sale = TurtleCoinSale.at('0x1d6a83045f2780d825a4a89cadfaeea25c839fee');


// console.log(sale)
tkn = sale.token.call()
console.log(tkn)


var coin = TurtleCoin.at(tkn)
// console.log(sale.sendTransaction)
web3.eth.sendTransaction({from: web3.eth.accounts[0], value: web3.toWei(2, "ether")})
data.setCommunication(tkn)

var requests = data.updateRequests({from:web3.eth.accounts[0]});

data.mintTurtle('test', 12, 34);



console.log(data.updateRequests.call({from:web3.eth.accounts[0]}));

//console.log(data.turtleName(data.Turtles.call(data.globalTurtles.call())));