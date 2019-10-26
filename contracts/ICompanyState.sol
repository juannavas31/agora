pragma solidity ^0.5.0;

// interface used to define data to be exchanged between RewardCoin and CompanyState contracts

/*
Indicators to consider in this contract as input from the company.
- total number of managers in top level, mid level and low level positions
- total number of women managers in the same management levels
- policies in place, both mandatory and optional

the contract computes and stores the equality index.
*/


interface ICompanySate {

  struct State {
    uint32 mgrsLevelA;
    uint32 mgrsLevelB;
    uint32 mgrsLevelC;
    uint32 womenMgrsLevelA;
    uint32 womenMgrsLevelB;
    uint32 womenMgrsLevelC;
    uint32 npo;  // number of mandatory policies
    uint32 npop; // number of voluntary policies
    uint32 ideA;  // "Indice de Equidad" Equality index at management level A
    uint32 ideB;
    uint32 ideC;
    uint32 ide;  // global equality index.

    uint dateOfReport;
  }

  function setState(uint32 _mgrsA, uint32 _mgrsB, uint32 _mgrsC,
                    uint32 _wMgrsA, uint32 _wMgrsB, uint32 _wMgrsC,
                    uint32 _npo, uint32 _npop) external;

  function getLatestState() view external returns (
    uint32 mgrsLevelA,
    uint32 mgrsLevelB,
    uint32 mgrsLevelC,
    uint32 womenMgrsLevelA,
    uint32 womenMgrsLevelB,
    uint32 womenMgrsLevelC,
    uint32 npo,
    uint32 npop,
    uint32 ideA,
    uint32 ideB,
    uint32 ideC,
    uint32 ide,
    uint dateOfReport);

  function getReward() view external returns (uint reward);

}
