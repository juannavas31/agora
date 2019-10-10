pragma solidity ^0.5.0;

import "./RewardCoin.sol";
import "./ICompanyState.sol";

/*
Indicators to consider in this contract as input from the company.
Nci: Nº de contratos indefinidos
NciA: Nº de contratos indefinidos en el nivel A
NciB: Nº de contratos indefinidos en el nivel B
NciC: Nº de contratos indefinidos en el nivel C
NMc: Nº de mujeres con contrato
NMci: Nº de mujeres con contrato indefinido
NMciA: Nº de mujeres con contrato indefinido en el nivel A
NMciB: Nº de mujeres con contrato indefinido en el nivel B
NMciC: Nº de mujeres con contrato indefinido en el nivel C
NP: Nº de políticas
PA: Coeficiente de ponderación para nivel A
PB: Coeficiente de ponderación para nivel B
PC: Coeficiente de ponderación para nivel C

Output results from indicators above
IM: Índice de Mujeres
IDE: Índice de Equidad
IC: Índice de Cumplimiento


NTok: Número de Tokens

*/

contract CompanyState is ICompanySate {

  address private owner;
  RewardCoin private rewardCoin;
  uint32 private factorA;  // factor to adjust level A ratio
  uint32 private factorB;
  uint32 private factorC;

  State[] KPIList;

  constructor (address _company, address _rewardCoin,
                uint32 _fA, uint32 _fB, uint32 _fC) public {
    rewardCoin = RewardCoin(_rewardCoin);
    owner = _company;
    factorA = _fA;
    factorB = _fB;
    factorC = _fC;
  }

  event StateRecorded(address indexed owner, uint32 ide, uint32 ideA, uint32 ideB,
                      uint32 ideC, uint32 npo, uint32 npop, uint32 reward);

  function setState(uint32 _nc, uint32 _nci, uint32 _nciA, uint32 _nciB, uint32 _nciC,
                    uint32 _nmc, uint32 _nmci, uint32 _nmciA, uint32 _nmciB, uint32 _nmciC,
                    uint32 _np) public {
    require(owner == msg.sender, "Error - Only owner can report indicators");

    State memory newReport;

    newReport.dateOfReport = now ;

    // compute the rest of indicators and kpis
    newReport.imci = 100*_nmci/_nci;
    uint32 imciA = 100*_nmciA/_nciA;
    uint32 imciB = 100*_nmciB/_nciB;
    uint32 imciC = 100*_nmciC/_nciC;
    newReport.ideA = 4*(imciA * (100 - imciA))/100;
    newReport.ideB = 4*(imciB * (100 - imciB))/100;
    newReport.ideC = 4*(imciC * (100 - imciC))/100;
    newReport.ide = factorA * newReport.ideA + factorB * newReport.ideB + factorC * newReport.ideC;

    newReport.imc = 100*_nmc/_nc;

    newReport.nc = _nc;
    newReport.nci = _nci;
    newReport.nciA = _nciA;
    newReport.nciB = _nciB;
    newReport.nciC = _nciC;
    newReport.nmc = _nmc;
    newReport.nmci = _nmci;
    newReport.nmciA = _nmciA;
    newReport.nmciB = _nmciB;
    newReport.nmciC = _nmciC;
    newReport.ic = 0;
    newReport.np = _np;

    // add new company state to the history log
    KPIList.push(newReport);

    uint32 reward = rewardCoin.setReward(msg.sender, newReport.ide, newReport.imc,
                                        newReport.imci, 0, 0);
    // emit StateRecorded(msg.sender, ide, ideA, ideB, ideC, npo, npop, reward);

    emit StateRecorded(msg.sender, newReport.ide, newReport.ideA, newReport.ideB, newReport.ideC, 0, 0, reward);
  }

  function getLatestState() public view returns (
      uint32 [17] memory values,
      uint256 dateOfReport) {

    uint index = KPIList.length -1 ;

    values[0] = KPIList[index].nc;
    values[1] = KPIList[index].nci;
    values[2] = KPIList[index].nciA;
    values[3] = KPIList[index].nciB;
    values[4] = KPIList[index].nciC;
    values[5] = KPIList[index].nmc;
    values[6] = KPIList[index].nmci;
    values[7] = KPIList[index].nmciA;
    values[8] = KPIList[index].nmciB;
    values[9] = KPIList[index].nmciC;
    values[10] = KPIList[index].imci;
    values[11] = KPIList[index].imc;
    values[12] = KPIList[index].ideA;
    values[13] = KPIList[index].ideB;
    values[14] = KPIList[index].ideC;
    values[15] = KPIList[index].ide;
    values[16] = KPIList[index].ic;
    dateOfReport = KPIList[index].dateOfReport;

  }

  function getReward() public view returns (uint reward) {
    // only owner can check its reward (current balance of tokens)
    require(msg.sender == owner, "Error - Only owner can check its balance");

    reward = rewardCoin.getBalance(msg.sender);
  }


}
