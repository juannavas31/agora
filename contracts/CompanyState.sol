pragma solidity ^0.5.0;

import "./RewardCoin.sol";
import "./IRewardCoin.sol";

contract CompanyState is IRewardCoin {

  address private owner;
  RewardCoin private rewardCoin;

  State[] KPIList;

  constructor (address _rewardCoin) public {
    rewardCoin = RewardCoin(_rewardCoin);
    owner = msg.sender;
  }

  event StateRecorded(address indexed owner, uint kpi1, uint kpi2, uint reward);

  function setOwner(address _newOwner) public returns (bool result) {
    if (owner == msg.sender) {
      // if the address ordering change of ownership is the current owner, we proceed to change it
      owner = _newOwner;
      result = true;
    }
    else {
      result = false;
    }
  }

  function setState(uint _p1, uint _p2, uint _p3) public {
    require(owner == msg.sender, "Error - Only owner can report indicators");

    State memory newReport;

    newReport.dateOfReport = now ;

    // compute the rest of kpis
    newReport.kpi1 = _p1;

    // add new company state to the history log
    KPIList.push(newReport);

    // I need to fix a compilation error due to the use of a struct as param.
    uint tempState = 0;

    // uint reward = rewardCoin.setReward(newReport, msg.sender);
    uint reward = rewardCoin.setReward(tempState, msg.sender);

    emit StateRecorded(msg.sender, newReport.kpi1, newReport.kpi2, reward);

  }

  function getLatestState() public view returns (uint kpi1, uint kpi2) {

    uint index = KPIList.length -1 ;

    kpi1 = KPIList[index].kpi1;


  }

  function getReward() public view returns (uint reward) {
    // only owner can check its reward (current balance of tokens)
    require(msg.sender == owner, "Error - Only owner can check its balance");

    reward = rewardCoin.getBalance(msg.sender);
  }


}
