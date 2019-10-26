const RewardCoin = artifacts.require("RewardCoin");
const CompanyState = artifacts.require("CompanyState");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(RewardCoin, {from: accounts[0]})
  .then(function(){
    return deployer.deploy(CompanyState,
                            accounts[1],
                            RewardCoin.address,
                            {from : accounts[1]})
  });
};
