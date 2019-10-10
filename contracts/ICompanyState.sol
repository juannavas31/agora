pragma solidity ^0.5.0;

// interface used to define data to be exchanged between RewardCoin and CompanyState contracts

/*
Indicators to consider in this contract as input from the company.
Nc: Nº de contratos (temporales + indefinidos)
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
IDE: Índice de Equidad. Hay un indice global y otro por cada nivel
IC: Índice de Cumplimiento


NTok: Número de Tokens

*/


interface ICompanySate {

  struct State {
    uint32 nc;
    uint32 nci;
    uint32 nciA;
    uint32 nciB;
    uint32 nciC;
    uint32 nmc;
    uint32 nmci;
    uint32 nmciA;
    uint32 nmciB;
    uint32 nmciC;
    uint32 imci;
    uint32 imc;
    uint32 np;
    uint32 ideA;
    uint32 ideB;
    uint32 ideC;
    uint32 ide;
    uint32 ic;

    uint dateOfReport;
  }

  function setState(uint32 _nc, uint32 _nci, uint32 _nciA, uint32 _nciB, uint32 _nciC,
                    uint32 _nmc, uint32 _nmci, uint32 _nmciA, uint32 _nmciB, uint32 _nmciC,
                    uint32 _np) external;

  function getLatestState() view external returns (
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
    uint dateOfReport);

  function getReward() view external returns (uint reward);

}
