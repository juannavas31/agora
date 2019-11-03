import React, { Component } from 'react';
import Layout from '../components/layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3js from '../ethereum/web3';
import { Router } from '../routes';
import Campaign from '../ethereum/campaign';
import ContributeForm from '../components/contributeForm';
import { Link } from '../routes';


// this component will show the latest KPIs and tokens balance, which are:
// - ide : Indice de Equidad
// - im : indice de mujeres
// - npo : numero de politicas obligatorias en marcha
// - npop : numero de politicas opcionales en marcha
// - balance de tokens acumlado
// and finally a button to View historic data

class HistoricResults extends Component {

    // this special function is called first by Next.js and the returned value
    // is placed in global props object.
    static async getInitialProps(props) {
        // the trick now is to get hold of the address of the campaing, which comes in the url.
        // that address comes from :address in the routing rules in routes.js. So the variable
        // address is inside props, and can be fetched through query property:
        // props.query.address
        // So now we need to create an instance of that contract to handle it.
        // console.log('campaign address: ', props.query.address);

        const campaign = Campaign(props.query.address);

        // now we can get the campaign details
        // this is an object with several properties, that are numbered like '0', '1', etc.
        const campaignDetails = await campaign.methods.getSummary().call();

        return {
            campaignAddress : props.query.address,
            minimumContribution : campaignDetails[0],
            balance : campaignDetails[1],
            requestsCount : campaignDetails[2],
            approversCount : campaignDetails[3],
            manager : campaignDetails[4]

        };
    };

    // method to display the details of the campaign, using a group of cards from semantid-ui
    renderCards(){

        // at this point, we've got in props object the details of the Campaign
        // we are going to pass those data through a bit of destructuring
        const {minimumContribution, balance, requestsCount, approversCount, manager} = this.props;

        const items = [
          {
            header: 'Minimum Contribution',
            description: 'Minium contribution accepted in Wei',
            meta: minimumContribution
          },
          {
            header: 'Balance',
            description: 'Balance of the campaign in ETH',
            meta: web3js.utils.fromWei(balance, 'ether')
          },
          {
            header: 'Manager',
            description:
              'Address of person who can create requests and approve them.',
            meta: manager,
            style : {overflowWrap : 'break-word'}
          },
          {
              header: 'Requests',
              description: 'Number of requests in this campaign',
              meta: requestsCount
          },
          {
              header: 'Approvers',
              description: 'Number of donators in this campaign',
              meta: approversCount
          }
      ];

        return <Card.Group items={items} /> ;

    }


    render(){
        return (
            <Layout>
            <div>
            <h3> Campaign Details </h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <ContributeForm address={this.props.campaignAddress}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column>
                    <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                        <a>
                            <Button primary>View Requests</Button>
                        </a>
                    </Link>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
            </Layout>
        );
    };

};

export default HistoricResults;
