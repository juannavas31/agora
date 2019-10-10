pragma solidity ^0.5.0;

import "./CompanyState.sol";
import "./RewardCoin.sol";

contract Fabric {

  address private rewardCoin;

  struct RegisteredCompany {
    string name;
    address companyAddress;
  }

  RegisteredCompany[] private companyList;
  mapping(address => bool) companyRegistered;

  constructor (address _rewardCoin) public {
    rewardCoin = _rewardCoin;
  }

  event CompanyRegistered(string indexed name, address indexed companyContract, bool result);

  function registerCompany(string memory _name, uint32 _factorA, uint32 _factorB, uint32 _factorC)
                      public returns (bool result) {
    require(companyRegistered[msg.sender] == false, "Error - Company already registered");
    // proceed to create a new contract for the company and add it to the mapping of registered companies
    CompanyState companyContract = new CompanyState(msg.sender, rewardCoin, _factorA, _factorB, _factorC);

    companyRegistered[msg.sender] = true;

    RegisteredCompany memory newCompany;
    newCompany.name = _name;
    newCompany.companyAddress = address(companyContract);

    companyList.push(newCompany);

    result = true;

    emit CompanyRegistered(_name, newCompany.companyAddress, result);

  }


}
