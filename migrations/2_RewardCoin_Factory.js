const RewardCoin = artifacts.require("RewardCoin");
const Factory = artifacts.require("Factory");
const CompanyState = artifacts.require('CompanyState');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(RewardCoin, {from:accounts[0], gas: '6000000'})
  .then(function(){
    return deployer.deploy(Factory, RewardCoin.address, {from : accounts[0], gas:6000000})
  })
};