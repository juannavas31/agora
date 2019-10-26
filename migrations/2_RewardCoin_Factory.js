const RewardCoin = artifacts.require("RewardCoin");
const Factory = artifacts.require("Factory");

module.exports = function(deployer) {
  deployer.deploy(RewardCoin)
  .then(function(){
    return deployer.deploy(Factory, RewardCoin.address)
  });
};
