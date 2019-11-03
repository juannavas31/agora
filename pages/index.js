import React, {Component} from 'react';
import { Card, Button, Grid, Segment, Table } from 'semantic-ui-react';
import Factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link } from '../routes';


class HomeIndex extends Component{

    static async getInitialProps(){
        // fetch list of deployed companies from the factory contract

        const company = await Factory.methods.getCompany().call();

        // now return the campaings object that will go into props object
        // so we will have available props.company

        return {company};
    };


    componentDidMount(){


    };

    renderCompany() {
        // We are going to create a card with the company data
        // if there is no company registered, a message will be shown

        if (this.props.company.registered == false) {
          return "No company registered, please Sign In"
        } else {
          const item = 
            {
              header : this.props.company.name ,
              meta : 'contract: ' + this.props.company.cAddress
            };

          return(
            <div>
            <div>
              <Card fluid
                header={item.header}
                meta={item.meta}
              />
            </div>
            <div>

            <Table striped collapsing border={0}>
              <Table.Body>
                <Table.Row >
                  <Table.Cell border='0'>

                    <Link route={`/reportIndicators/${this.props.company.cAddress}`} >
                    <a>
                        <Button primary floated='right' style={{marginBottom:10}}>Report Indicators</Button>
                    </a>
                    </Link>              
                  </Table.Cell>
                  <Table.Cell>
                    <Link route={`/showKPIs/${this.props.company.cAddress}`} >
                    <a>
                        <Button primary floated='right' style={{marginBottom:10}}>Show KPIs</Button>
                    </a>
                    </Link>
                  </Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
            </div>
            </div>
          );
        }
    };

    render(){
        return (
            <Layout >
                <div>
                    <h2>Gender Gap Reduction Program</h2>
                    {this.renderCompany()}
                </div>
            </Layout>
        );
    }

};

export default HomeIndex;
