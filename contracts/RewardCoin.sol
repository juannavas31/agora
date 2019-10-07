pragma solidity ^0.5.0;

import "./ERC20.sol";
import "./IRewardCoin.sol";

contract RewardCoin is IRewardCoin, ERC20 {

  function setReward(uint _state, address company) public returns (uint reward) {
    require(company != address(0), "Error - Company address cannot be ZERO");
    // formula to compute the reward based on the kpis coming in State structure

    reward = 1;

    _mint(company, reward);

  }

  function getBalance(address company) public view returns (uint balance) {
    require(company != address(0), "Error - Company address cannot be ZERO");

    balance = balanceOf(company);
  }
}
