import React, { Component } from 'react';
import Layout from '../components/layout';
import { Table, Container } from 'semantic-ui-react';
import web3js from '../ethereum/web3';
import { Router } from '../routes';
import CompanyState from '../ethereum/companyState';
import { Link } from '../routes';


// this component will show the previous KPIs in a table format:
// - ide : Indice de Equidad
// - im : indice de mujeres
// - npo : numero de politicas obligatorias en marcha
// - npop : numero de politicas opcionales en marcha

class PreviousResults extends Component {

  constructor(props){
    super(props);
    let address = ''; 
    if (props.url.query != undefined) {
      address = props.url.query.address; 
    }

    this.state = {
      npoList: [], 
      npopList: [],
      ideList: [],
      dateList: [],
      womenRatioList: [],
      address: address
    }
  }

  async componentDidMount() {

    if (this.state.address == '') {
      this.setState({message: "No company contract availble. Please, sign in"}); 
    } else {

      // So now we need to create an instance of the contract to retrieve the KPIs

      const company = CompanyState(this.state.address);

      // now we can get the latest KPIs
      // this is an object with several properties, that are we are going to de-structure.

      const accounts = await web3js.eth.getAccounts();


      let result = await company.methods.getPeviousStates().call({from: accounts[1]});

      let {ideList, npoList, npopList, womenRatioList, dateList} = result; 


      console.log("previousKPIs - componentDidMount - dateList:", dateList);

      this.setState ({
        npoList : npoList,
        npopList : npopList,
        ideList : ideList,
        dateList : dateList,
        womenRatioList : womenRatioList
      });

    }
  };


  renderRow(row){
    return row.map(cell => {
      return (
        <Table.Cell textAlign='center'>{cell}</Table.Cell>
      )
    }); 
  }

  renderTableBody(){
    // at this point, we've got in state object the KPIs

    let {ideList, npoList, npopList, womenRatioList, dateList} = this.state;

    if (ideList == undefined) {
      return ''; 
    }

    let matrix = []; 
    for (let i=0; i<ideList.length; i++){
      let dateInt = parseInt(dateList[i])*1000; // javasscript timestamp is in milliseconds, solidity in seconds
      let dateObj = new Date(dateInt); 
      let month = (dateObj.getMonth() + 1).toString(); 
      let dateStr = dateObj.getDate() + "-" + month + "-" + dateObj.getFullYear();
      let ideStr = (ideList[i]/10000).toFixed(2) + '%'; 
      matrix.push([ideStr, womenRatioList[i]+"%", npoList[i], npopList[i], dateStr]);
    }

    return matrix.map(row => {
      return (
        <Table.Row>
          {this.renderRow(row)}
        </Table.Row>
      )
    })
  }

  // method to display the KPIs, using a table from semantic-ui
  renderKPIs(){

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>IDE</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Women Ratio</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Mandatory Policies</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Optional Policies</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderTableBody()}
        </Table.Body>
      </Table>
    ) ;
  }

  render(){
    if (this.props.message) {
      return (
        <Layout>
        <Container>
        <h3> Previous KPIs </h3>
        ${this.props.message}
        </Container>
        </Layout>
      );
    } else {
      return (
        <Layout>
        <Container>
          <h3> Previous KPIs </h3>
          <p>List of all KPIs from indicators reported so far</p>
          <p></p>   
        </Container>
        <Container>
          {this.renderKPIs()}
        </Container>
        </Layout>
      );
    }
  };

};

export default PreviousResults;
