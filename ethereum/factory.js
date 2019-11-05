import web3js from './web3.js';

// address in alastria where the factory contract is deployed
const contractAddress = '0xAD5EaC26D4274AfC4E61405f7127F479b4ab257E';

const ABIinterface = '[{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerCompany","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCompany","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"cAddress","type":"address"},{"internalType":"bool","name":"registered","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardCoin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"name","type":"string"},{"indexed":true,"internalType":"address","name":"companyContract","type":"address"},{"indexed":false,"internalType":"bool","name":"result","type":"bool"}],"name":"CompanyRegistered","type":"event"}]';

// let's create a local copy of the contract
const factory = new web3js.eth.Contract(JSON.parse(ABIinterface), contractAddress);

export default factory;
