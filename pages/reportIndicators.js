import React, { Component } from 'react';
import Layout from '../components/layout';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import factoryContract from '../ethereum/factory';
import companyState from '../ethereum/companyState';

import web3js from '../ethereum/web3';
import { Router } from '../routes';


class ReportIndicators extends Component {

  constructor (props) {
    super(props);
    let contractAddress = '';

    if (this.props.url.query != undefined) {
      contractAddress = this.props.url.query.address;
    }

    this.state = {
        mgrsLevelA : 0,
        mgrsLevelB : 0,
        mgrsLevelC : 0,
        womenMgrsLevelA : 0,
        womenMgrsLevelB : 0,
        womenMgrsLevelC : 0,
        ideA : 0,
        ideB : 0,
        ideC : 0,
        ide : 0,
        npo : 0,
        npop : 0,
        errorMessage : '',
        loadingFlag : false,
        address : contractAddress
    };
  }

  // event handler for the submit button
  // defined as an arrow function, so that it can be called as this.onSubmit
  onSubmit = async (event) =>{
      // by default, the browswer will send the info from the form to the server
      // we don't want that, we need to interact with the smart-contract.
      event.preventDefault();

      // start up the spinner just after user has clicked the button
      // and clear the errorMessage
      this.setState({loadingFlag: true, errorMessage: ''});


      try {

          if (this.state.address == '') {
             throw 'No company contract deployed yet in Blockchain. Please Sign in';
          }

          const accounts = await web3js.eth.getAccounts();

          const companyContract = companyState(this.state.address);
          // send the data captured in the form to the company instance contract.

          console.log("ReportIndicators. About to send data"); 
          
          let result = await companyContract.methods.setState(this.state.mgrsLevelA,
                                                  this.state.mgrsLevelB,
                                                  this.state.mgrsLevelC,
                                                  this.state.womenMgrsLevelA,
                                                  this.state.womenMgrsLevelB,
                                                  this.state.womenMgrsLevelC,
                                                  this.state.npo,
                                                  this.state.npop)
                                  .send({from:accounts[1],
                                          gas: '6000000'});

          // after sending the data, we move to the root page
          console.log('reportIndicators, result: ', result); 
          
          Router.pushRoute('home');
      } catch (errorCreate) {
          this.setState({errorMessage: errorCreate.message});
      };

      this.setState({loadingFlag:false});
  };

    render() {
            return (
                <Layout >
                    <div>
                        <h3>Report Indicators</h3>
                        <p>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                          <Form.Field width={6}>
                            <Input label='Number of top level Executives' labelPosition='left' placeholder='0' 
                                value={this.state.mgrsLevelA}
                                onChange={(event)=>{ this.setState({mgrsLevelA:event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of second level Executives' labelPosition='left' placeholder='0'
                                value={this.state.mgrsLevelB}
                                onChange={(event)=>{ this.setState({mgrsLevelB:event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of third level Executives' labelPosition='left' placeholder='0'
                                value={this.state.mgrsLevelC}
                                onChange={(event)=>{ this.setState({mgrsLevelC:event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of women top level Executives' labelPosition='left' placeholder='0'
                                value={this.state.womenMgrsLevelA}
                                onChange={(event)=>{ this.setState({womenMgrsLevelA:event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of women second level Executives' labelPosition='left' placeholder='0'
                                value={this.state.womenMgrsLevelB}
                                onChange={(event)=>{ this.setState({womenMgrsLevelB:event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of women third level Executives' labelPosition='left' placeholder='0'
                                value={this.state.womenMgrsLevelC}
                                onChange={(event)=>{ this.setState({womenMgrsLevelC:event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of mandatory policies in place' labelPosition='left' placeholder='0'
                                value={this.state.npo}
                                onChange={(event)=>{ this.setState({npo : event.target.value})}}
                            />
                          </Form.Field>

                          <Form.Field width={6}>
                            <Input label='Number of optional policies in place' labelPosition='left' placeholder='0'
                                value={this.state.npop}
                                onChange={(event)=>{ this.setState({npop : event.target.value})}}
                            />
                          </Form.Field>

                          <Message error header='Ooops!' content={this.state.errorMessage} />

                          <Button loading={this.state.loadingFlag} primary type='submit'>Send</Button>
                        </Form>
                        </p>
                    </div>
                </Layout>
            );
    };

};

export default ReportIndicators;
