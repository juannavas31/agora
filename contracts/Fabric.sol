pragma solidity ^0.5.0;

import "./CompanyState.sol";
import "./RewardCoin.sol";

Contract Fabric {

  RewardCoin private rewardCoin;

  struct RegisteredCompany {
    string name;
    address companyAddress;
  }

  RegisteredCompany[] private companyList;
  map(address => bool) companyRegistered;

  Constructor (address _rewardCoin) public {
    rewardCoin = RewardCoin(_rewardCoin);
  }

  event CompanyRegistered(string indexed name, address indexed companyContract, bool result);

  function registerCompany(string memory _name) public returns (bool result) {
    require(companyRegistered[msg.sender] == false, "Error - Company already registered");
    // proceed to create a new contract for the company and add it to the mapping of registered companies
    CompanyState companyContract = new CompanyState(rewardCoin);

    result = companyState.setOwner(msg.sender);
    companyRegistered[msg.sender] = true;

    RegisteredCompany store newCompany;
    newCompany.name = _name;
    newCompany.companyAddress = address(companyContract);

    companyList.push(newCompany);

    emit CompanyRegistered(_name, address, result);
    
  }


}
