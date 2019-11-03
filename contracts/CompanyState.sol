pragma solidity ^0.5.0;

import "./RewardCoin.sol";
import "./ICompanyState.sol";


contract CompanyState is ICompanySate {

  address private owner;
  RewardCoin private rewardCoin;
  uint32 constant private factorA = 30;  // factor to adjust level A ratio
  uint32 constant private factorB = 40;
  uint32 constant private factorC = 30;

  State[] KPIList;

  constructor (address _company, address _rewardCoin) public {
    rewardCoin = RewardCoin(_rewardCoin);
    owner = _company;
  }

  event StateRecorded(address indexed owner, uint32 ide, uint32 ideA, uint32 ideB,
                      uint32 ideC, uint32 npo, uint32 npop, uint32 reward);

  function setState(uint32 _mgrsA, uint32 _mgrsB, uint32 _mgrsC,
                    uint32 _wMgrsA, uint32 _wMgrsB, uint32 _wMgrsC, uint32 _npo,
                    uint32 _npop) public {

    require(owner == msg.sender, "Error - Only owner can report indicators");
    require(((_wMgrsA <= _mgrsA) && (_wMgrsB <= _mgrsB) && ( _wMgrsC <= _mgrsC)), "Error, women executives cannot be greater than total executives");

    State memory newReport;

    newReport.dateOfReport = now;

    // compute the rest of indicators and kpis
    uint32 wMgrsA_Ratio = 100*_wMgrsA/_mgrsA;
    uint32 wMgrsB_Ratio = 100*_wMgrsB/_mgrsB;
    uint32 wMgrsC_Ratio = 100*_wMgrsB/_mgrsC;
    newReport.ideA = 4*(wMgrsA_Ratio * (100 - wMgrsA_Ratio));
    newReport.ideB = 4*(wMgrsB_Ratio * (100 - wMgrsB_Ratio));
    newReport.ideC = 4*(wMgrsC_Ratio * (100 - wMgrsC_Ratio));
    newReport.ide = factorA * newReport.ideA + factorB * newReport.ideB + factorC * newReport.ideC;

    newReport.mgrsLevelA = _mgrsA;
    newReport.mgrsLevelB = _mgrsB;
    newReport.mgrsLevelC = _mgrsC;
    newReport.womenMgrsLevelA = _wMgrsA;
    newReport.womenMgrsLevelB = _wMgrsB;
    newReport.womenMgrsLevelC = _wMgrsC;
    newReport.npo = _npo;
    newReport.npop = _npop;

    // add new company state to the history log
    KPIList.push(newReport);

    uint32 womenMgrsRatio = 100*(_wMgrsA + _wMgrsB + _wMgrsC)/(_mgrsA + _mgrsB + _mgrsC);

    uint32 reward = rewardCoin.setReward(msg.sender, newReport.ide, womenMgrsRatio,
                                         newReport.npo, newReport.npop);
    // emit StateRecorded(msg.sender, ide, ideA, ideB, ideC, npo, npop, reward);

    emit StateRecorded(msg.sender, newReport.ide, newReport.ideA, newReport.ideB, newReport.ideC, newReport.npo, newReport.npop, reward);
  }

  function getLatestState() public view returns (
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
      uint256 dateOfReport) {

    uint index = KPIList.length -1 ;

    mgrsLevelA = KPIList[index].mgrsLevelA;
    mgrsLevelB = KPIList[index].mgrsLevelB;
    mgrsLevelC = KPIList[index].mgrsLevelC;
    womenMgrsLevelA = KPIList[index].womenMgrsLevelA;
    womenMgrsLevelB = KPIList[index].womenMgrsLevelB;
    womenMgrsLevelC = KPIList[index].womenMgrsLevelC;
    npo = KPIList[index].npo;
    npop = KPIList[index].npop;
    ideA = KPIList[index].ideA;
    ideB = KPIList[index].ideB;
    ideC = KPIList[index].ideC;
    ide = KPIList[index].ide;
    dateOfReport = KPIList[index].dateOfReport;

  }

  function getReward() public view returns (uint reward) {
    // only owner can check its reward (current balance of tokens)
    require(msg.sender == owner, "Error - Only owner can check its balance");

    reward = rewardCoin.getBalance(msg.sender);
  }


}
