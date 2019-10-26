pragma solidity ^0.5.0;

import "./CompanyState.sol";
import "./RewardCoin.sol";

contract Factory {

  address private rewardCoin;

  struct RegisteredCompany {
    bool registered;
    string name;
    address companyContract;
  }

  RegisteredCompany private company;

  constructor (address _rewardCoin) public {
    rewardCoin = _rewardCoin;
  }

  event CompanyRegistered(string indexed name, address indexed companyContract, bool result);

  function registerCompany(string memory _name)
                      public returns (bool result) {
    require(company.registered == false, "Error - Company already registered");
    // proceed to create a new contract for the company and add it to the mapping of registered companies
    CompanyState companyContract = new CompanyState(msg.sender, rewardCoin);

    company.registered = true;
    company.name = _name;
    company.companyContract = address(companyContract);

    result = true;

    emit CompanyRegistered(_name, company.companyContract, result);

  }

  function getCompany() public view returns(string memory name, address cAddress, bool registered){

    registered = company.registered;
    cAddress = company.companyContract;
    name = company.name;

  }

}
