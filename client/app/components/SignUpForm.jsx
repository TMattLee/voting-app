import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import updateMessage from '../lib/updateMessage.js';
import register from '../lib/signUp.js';
import checkAuth from '../lib/checkAuth.js';
import initAuth from '../lib/initAuth.js'

export class SignUpForm extends Component{
  constructor( props ){
    super( props );
    this.handleSubmit = this.handleSubmit.bind( this );
  }
  
  componentWillMount(){
    initAuth( this.props );
    updateMessage( this.props, "" );
    checkAuth( this.props );
  }
  
  handleSubmit( event ) {
    event.preventDefault();
    const pw1 = event.target[1].value;
    const pw2 = event.target[2].value;
    if( pw1 !== pw2 ){
      updateMessage( this.props, "Passwords do not match")
    }
    else{
      const uid = event.target[0].value;
      register( this.props, uid, pw1 );
    }
  }
  render(){
    return ( 
      <Redirect to={ '/voting-app/' } />
    );
    /*const { redirect } = this.props;
    if ( redirect ) {
      const endpoint = '/voting-app/dashboard/';
      return <Redirect to={ endpoint } />;
    }*/
    return (
      <div>
        <form action="/voting-app/signup" encType="x-www-form-urlencoded" onSubmit={ this.handleSubmit } >
          
          <div> Pick a username</div>
          <input type="text" name="uname" required /><br />
          <div> Create Password</div>
          <input type="password" name="upassword" required />
          <br />
          <div> Re-enter Password </div>
          <div style={ styles.passwordGroup}>
            <input type="password" name="upassword" required />
            { 
              this.props.message !== "" && 
              <div style={ styles.message }> 
                {this.props.message}
              </div>
            }
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const styles = {
  button:{
    backgroundColor:  'blue',
    cursor:           'pointer',
  },
  message:{
    marginLeft:       '10px',
    color:            'red',
  },
  passwordGroup:{
    display:          'flex',
  }
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  polls:              state.currentState.polls,
  redirect:           state.currentState.redirect,

});

export default connect(
  mapStateToProps
)( SignUpForm );