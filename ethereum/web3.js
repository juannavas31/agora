import Web3 from 'web3';

// create an instance of web3 provider using ganache.

const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3js = new Web3(provider);


export default web3js;
