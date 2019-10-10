pragma solidity ^0.5.0;

import "./ERC20.sol";

contract RewardCoin is ERC20 {

  function setReward(address company, uint32 ide, uint32 imc, uint32 imci,
                      uint32 npo, uint32 npop) public returns (uint32 reward) {
    require(company != address(0), "Error - Company address cannot be ZERO");
    // formula to compute the reward based on the kpis coming in State structure

    reward = 0;

    if (imci > 90)  ++reward;
    if (imc > 90)  ++reward;
    if (ide > 70)  ++reward;
    if (ide > 80)  ++reward;
    if (ide > 90)  ++reward;
    if (npo > 5)  ++reward;
    if (npo > 15)  ++reward;
    if (npop > 5)  ++reward;
    if (npop > 15)  ++reward;


    _mint(company, reward);

  }

  function getBalance(address company) public view returns (uint balance) {
    require(company != address(0), "Error - Company address cannot be ZERO");

    balance = balanceOf(company);
  }
}
