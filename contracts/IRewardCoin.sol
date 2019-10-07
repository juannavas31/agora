pragma solidity ^0.5.0;

// interface used to define data to be exchanged between RewardCoin and CompanyState contracts

interface IRewardCoin {

  struct State {
    uint kpi1;
    uint kpi2;
    uint dateOfReport;
  }

}
