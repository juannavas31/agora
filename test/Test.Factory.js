const truffleAssert = require('truffle-assertions');
var FactoryArtifact = artifacts.require("./Factory.sol");

contract ("Factory", function(accounts){

  // let's check the contract is deployed
  it('Desplegar contrato', async function(){

    let factoryInstance = await FactoryArtifact.deployed();

    assert.equal((factoryInstance != null), true, "Error deploying contract");
  });

  it("Register a new company", async function(){
    try {

      let factoryInstance = await FactoryArtifact.deployed();

      let name = "Dream Chain";

      let result = await factoryInstance.registerCompany(name, {from:accounts[1]});

      truffleAssert.eventEmitted(result, 'CompanyRegistered');

    } catch (err) {
          assert.fail("Error: Register Company: " + err);
    }
  });

  it("Retrieves a registered company", async function(){
    try {

      let factoryInstance = await FactoryArtifact.deployed();

      let result = await factoryInstance.getCompany({from:accounts[1]});

      assert.equal(result.name, "Dream Chain");
      assert.equal(result.registered, true);

    } catch (err) {
          assert.fail("Error: Get Company data: " + err);
    }
  });

});
