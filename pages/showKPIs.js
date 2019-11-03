import React, { Component } from 'react';
import Layout from '../components/layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3js from '../ethereum/web3';
import { Router } from '../routes';
import CompanyState from '../ethereum/companyState';
import { Link } from '../routes';


// this component will show the latest KPIs and tokens balance, which are:
// - ide : Indice de Equidad
// - im : indice de mujeres
// - npo : numero de politicas obligatorias en marcha
// - npop : numero de politicas opcionales en marcha
// - balance de tokens acumlado
// and finally a button to View historic data

class ShowKPIs extends Component {

  constructor(props){
    super(props);
    let address = ''; 
    if (props.url.query != undefined) {
      address = props.url.query.address; 
    }

    this.state = {
      npo: 0, 
      npop: 0,
      ideA: 0, 
      ideB: 0,
      ideC: 0,
      ide: 0,
      dateOfReport: 0,
      womenRatio: 0,
      tokensBalance: 0,
      mgrsLevelA : 0,
      mgrsLevelB : 0,
      mgrsLevelC : 0,
      womenMgrsLevelA : 0,
      womenMgrsLevelB : 0,
      womenMgrsLevelC : 0,
      address: address

    }
  }

    // this special function is called first by Next.js and the returned value
    // is placed in global props object.
    async componentDidMount() {

      if (this.state.address == '') {
        this.setState({message: "No company contract availble. Please, sign in"}); 
      } else {
    
        // So now we need to create an instance of the contract to retrieve the KPIs before rendering the page.

        console.log('ShowKPIs url-address: ', this.state.address); 

        const company = CompanyState(this.state.address);

        // now we can get the latest KPIs
        // this is an object with several properties, that are numbered like '0', '1', etc.

        const accounts = await web3js.eth.getAccounts();

        const latestKPIs = await company.methods.getLatestState().call({from: accounts[1]});

        const tokensBalance = await company.methods.getReward().call({from: accounts[1]});

        let womenRatio=(latestKPIs.womenMgrsLevelA+latestKPIs.womenMgrsLevelB+latestKPIs.womenMgrsLevelC)/(latestKPIs.mgrsLevelA+latestKPIs.mgrsLevelB+latestKPIs.mgrsLevelC);

        this.setState ({
            mgrsLevelA : latestKPIs.mgrsLevelA,
            mgrsLevelB : latestKPIs.mgrsLevelB,
            mgrsLevelC : latestKPIs.mgrsLevelC,
            womenMgrsLevelA : latestKPIs.womenMgrsLevelA,
            womenMgrsLevelB : latestKPIs.womenMgrsLevelB,
            womenMgrsLevelC : latestKPIs.womenMgrsLevelC,
            npo : latestKPIs.npo,
            npop : latestKPIs.npop,
            ideA : latestKPIs.ideA,
            ideB : latestKPIs.ideB,
            ideC : latestKPIs.ideC,
            ide : latestKPIs.ide,
            dateOfReport : latestKPIs.dateOfReport,
            womenRatio : womenRatio,
            tokensBalance : tokensBalance
        });

      }
    };

    // method to display the KPIs, using a group of cards from semantid-ui
    renderCardsKPIs(){

        // at this point, we've got in props object the KPIs
        // we are going to pass those data through a bit of destructuring
        const {npo, npop, ideA, ideB, ideC, ide, dateOfReport, womenRatio, tokensBalance} = this.state;

        const items = [
          {
            header: 'IDE',
            description: 'Index of Equality',
            meta: ide / 1000000
          },
          {
            header: 'Tokens',
            description: 'Balance of tokens earned',
            meta: tokensBalance
          },
          {
            header: 'Women Ratio',
            description: 'Women vs Total ratio',
            meta: womenRatio
          },
          {
              header: 'NPO',
              description: 'Number of Policies in place',
              meta: npo
          },
          {
              header: 'NPOP',
              description: 'Number of Optional Policies in place',
              meta: npop
          }
      ];

        return <Card.Group items={items} /> ;
    }

    // method to display the KPIs, using a group of cards from semantid-ui
    renderCardsIndicators(){

        // at this point, we've got in props object the KPIs
        // we are going to pass those data through a bit of destructuring
        const {mgrsLevelA, mgrsLevelB, mgrsLevelC, womenMgrsLevelA, womenMgrsLevelB, womenMgrsLevelC, dateOfReport} = this.state;


        let numericDate = parseInt(dateOfReport._hex); 
        const dateFormatted = new Date(numericDate).toString(); 

        console.log("Show KPIs date numeric: ", numericDate); 

        const items = [
          {
            header: 'Top Level Executives',
            description: 'CEO and Board of Directors',
            meta: mgrsLevelA
          },
          {
            header: 'Women Top Level Executives',
            description: 'Women managers in level A',
            meta: womenMgrsLevelA
          },
          {
            header: 'Second Level Executives',
            description: 'Executives reporting to Board of Directors',
            meta: mgrsLevelB
          },
          {
            header: 'Women Second Level Executives',
            description: 'Executives reporting to Board of Directors',
            meta: womenMgrsLevelB
          },
          {
            header: 'Third Level Executives',
            description: 'Area Directors',
            meta: mgrsLevelC
          },
          {
            header: 'Women Third Level Executives',
            description: 'Area Directors',
            meta: womenMgrsLevelC
          },
          {
            header: 'Date',
            description: 'Date of reported indicators',
            meta: dateFormatted
          }
      ];

        return <Card.Group itemsPerRow={2} items={items} /> ;

    }


    render(){
      if (this.props.message) {
        return (
          <Layout>
          <div>
          <h3> KPIs and Indicators </h3>
          ${this.props.message}
          </div>
          </Layout>
        );
      } else {
        return (
          <Layout>
          <div>
          <h3> KPIs and Indicators </h3>
          <Grid>
              <Grid.Row>
                  <Grid.Column width={10}>
                      {this.renderCardsKPIs()}
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={10}>
                    {this.renderCardsIndicators()}
                </Grid.Column>
              </Grid.Row>
          </Grid>
          </div>
          </Layout>
        );
      }
    };

};

export default ShowKPIs;
