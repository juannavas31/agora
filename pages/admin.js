import React, { Component } from 'react';
import Layout from '../components/layout';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';

import web3js from '../ethereum/web3';
import { Router } from '../routes';


class Admin extends Component {

  constructor (props) {
    super(props);

    console.log('props in admin constructor: ', props);

    this.state = {
        companyName : '',
        errorMessage : '',
        loadingFlag : false
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

      console.log('admin - onSubmit value', this.state.companyName);

      this.setState({loadingFlag: true, errorMessage: ''});


      try {

          if (this.state.companyName == '') {
             throw 'No company contract deployed yet in Blockchain';
          }

          const accounts = await web3js.eth.getAccounts();
          // send the data captured in the form to the company instance contract.
          await factory.methods.registerCompany(this.state.companyName)
                                  .send({from:accounts[1],
                                          gas: '6000000'});
                                          
          // after sending the data, we move to the root page
          Router.pushRoute('home');
          
      } catch (errorCreate) {
          this.setState({errorMessage: errorCreate.message});
      };

      this.setState({loadingFlag:false});
  };

    render() {
            return (
                <Layout>
                    <div>
                        <h3>Register Company</h3>
                        <p>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                          <Form.Field>
                            <Input label='Name' labelPosition='left' placeholder=''
                                value={this.state.companyName}
                                onChange={(event)=>{ this.setState({companyName:event.target.value})}}
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

export default Admin;
