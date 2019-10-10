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

    uint32 imci = 100*_nmci/_nci;
    uint32 imciA = 100*_nmciA/_nciA;
    uint32 imciB = 100*_nmciB/_nciB;
    uint32 imciC = 100*_nmciC/_nciC;
    uint32 ideA = 4*(imciA * (100 - imciA))/100;
    uint32 ideB = 4*(imciB * (100 - imciB))/100;
    uint32 ideC = 4*(imciC * (100 - imciC))/100;
    uint32 ide = factorA * ideA + factorB * ideB + factorC * ideC;
    uint32 ic = 0;
    uint32 npo = 0;
    uint32 npop = 0;

    uint32 imc = 100*_nmc/_nc;

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
    newReport.imci = imci;
    newReport.imc = imc;
    newReport.ideA = ideA;
    newReport.ideB = ideB;
    newReport.ideC = ideC;
    newReport.ide = ide;
    newReport.ic = ic;
    newReport.np = _np;

    // add new company state to the history log
    KPIList.push(newReport);

    uint32 reward = rewardCoin.setReward(msg.sender, ide, imc, imci, npo, npop);

    emit StateRecorded(msg.sender, ide, ideA, ideB, ideC, npo, npop, reward);

  }

  function getLatestState() public view returns (
      uint32 nc,
      uint32 nci,
      uint32 nciA,
      uint32 nciB,
      uint32 nciC,
      uint32 nmc,
      uint32 nmci,
      uint32 nmciA,
      uint32 nmciB,
      uint32 nmciC,
      uint32 imci,
      uint32 imc,
      uint32 np,
      uint32 ideA,
      uint32 ideB,
      uint32 ideC,
      uint32 ide,
      uint32 ic,
      uint dateOfReport) {

    uint index = KPIList.length -1 ;

    nc = KPIList[index].nc;
    nci = KPIList[index].nci;
    nciA = KPIList[index].nciA;
    nciB = KPIList[index].nciB;
    nciC = KPIList[index].nciC;
    nmc = KPIList[index].nmc;
    nmci = KPIList[index].nmci;
    nmciA = KPIList[index].nmciA;
    nmciB = KPIList[index].nmciB;
    nmciC = KPIList[index].nmciC;
    imci = KPIList[index].imci;
    imc = KPIList[index].imc;
    ideA = KPIList[index].ideA;
    ideB = KPIList[index].ideB;
    ideC = KPIList[index].ideC;
    ide = KPIList[index].ide;
    ic = KPIList[index].ic;
    dateOfReport = KPIList[index].dateOfReport;

  }

  function getReward() public view returns (uint reward) {
    // only owner can check its reward (current balance of tokens)
    require(msg.sender == owner, "Error - Only owner can check its balance");

    reward = rewardCoin.getBalance(msg.sender);
  }


}
