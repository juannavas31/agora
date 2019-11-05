const truffleAssert = require('truffle-assertions');
var CompanyStateArtifact = artifacts.require("./CompanyState.sol");

contract ("CompanyState", function(accounts){

  let mgrsA = 20;
  let mgrsB = 40;
  let mgrsC = 80;
  let wMgrsA = 5;
  let wMgrsB = 20;
  let wMgrsC = 40;
  let npo = 6;
  let npop = 20;


  // let's check the contract is deployed
  it('Desplegar contrato', async function(){

    let companyInstance = await CompanyStateArtifact.deployed();

    assert.equal((companyInstance != null), true, "Error deploying contract");
  });

  it("Set and Store indicators", async function(){
    try {

      let companyInstance = await CompanyStateArtifact.deployed();

      let result = await companyInstance.setState(mgrsA, mgrsB, mgrsC,
                                                  wMgrsA, wMgrsB, wMgrsC,
                                                  npo, npop, {from:accounts[1]});

      truffleAssert.eventEmitted(result, 'StateRecorded');

    } catch (err) {
          assert.fail("Error: Set Indicators: " + err);
    }
  });

  it("Retrieves latest KPIs", async function(){
    try {

      let companyInstance = await CompanyStateArtifact.deployed();

      let result = await companyInstance.getLatestState({from:accounts[1]});

      assert.equal(result.mgrsLevelA, mgrsA);
      assert.equal(result.mgrsLevelB, mgrsB);
      assert.equal(result.womenMgrsLevelC, wMgrsC);
      assert.equal(result.npo, npo);
      assert.equal(result.npop, npop);

    } catch (err) {
          assert.fail("Error: Get Company data: " + err);
    }
  });


  it("Retrieves tokens balance", async function(){
    try {

      let companyInstance = await CompanyStateArtifact.deployed();

      let result = await companyInstance.getReward({from:accounts[1]});

      assert.equal(result, 6);

    } catch (err) {
          assert.fail("Error: Get Company data: " + err);
    }
  });


  it("Retrieves previous KPIs", async function(){

    // new indicators to be reported to the contract
    let mgrsA = 40;
    let mgrsB = 80;
    let mgrsC = 160;
    let wMgrsA = 10;
    let wMgrsB = 30;
    let wMgrsC = 70;
    let npo = 20;
    let npop = 40;
    
    try {

      let companyInstance = await CompanyStateArtifact.deployed();

      let result = await companyInstance.setState(mgrsA, mgrsB, mgrsC,
        wMgrsA, wMgrsB, wMgrsC,
        npo, npop, {from:accounts[1]});


      let {ideList, npoList, npopList, womenRatioList, dateList} = await companyInstance.getPeviousStates({from:accounts[1]});

      // the new indicators are stored in second position in the array
      assert.equal(npoList[1], npo);
      assert.equal(npopList[1], npop);


    } catch (err) {
          assert.fail("Error: Get Company data: " + err);
    }
  });



});
