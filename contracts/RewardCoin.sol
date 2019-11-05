pragma solidity ^0.5.0;

import "./ERC20.sol";

contract RewardCoin is ERC20 {

  uint32 constant private bronceIdeThreshold = 700000;  // equivalent to 70%
  uint32 constant private silverIdeThreshold = 800000;
  uint32 constant private  goldIdeThreshold = 900000;
  uint32 constant private silverPoliciesThreshold = 5;
  uint32 constant private goldPoliciesThreshold = 15;

  function setReward(address company, uint32 ide, uint32 imc,
                      uint32 npo, uint32 npop) public returns (uint32 reward) {
    require(company != address(0), "Error - Company address cannot be ZERO");
    // formula to compute the reward based on the kpis coming in State structure

    reward = 0;

    if (imc > 30 && imc < 70)  ++reward;
    if (ide > bronceIdeThreshold)  ++reward;
    if (ide > silverIdeThreshold)  ++reward;
    if (ide > goldIdeThreshold)  ++reward;
    if (npo > silverPoliciesThreshold)  ++reward;
    if (npo > goldPoliciesThreshold)  ++reward;
    if (npop > silverPoliciesThreshold)  ++reward;
    if (npop > goldPoliciesThreshold)  ++reward;


    _mint(company, reward);

  }

  function getBalance(address company) public view returns (uint balance) {
    require(company != address(0), "Error - Company address cannot be ZERO");

    balance = balanceOf(company);
  }
}
