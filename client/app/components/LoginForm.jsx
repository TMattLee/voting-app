import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import attemptLogin from '../lib/attemptLogin.js';
import updateMessage from '../lib/updateMessage.js';
import checkAuth from '../lib/checkAuth.js';
import initAuth from '../lib/initAuth.js'

const cookies = new Cookies();

class LoginForm extends Component{
  constructor( props ){
    super( props );
    this.handleSubmit = this.handleSubmit.bind( this );
  }
  
  componentDidMount(){
    initAuth( this.props );
    updateMessage( this.props, "" )
    checkAuth( this.props );
  }
  
  handleSubmit( event ) {
    event.preventDefault();
    const uid = event.target[0].value;
    const pw = event.target[1].value;
    const info = {
      "uid": uid,
      "utoken": pw
    };
    attemptLogin( this.props, info );
  }
  
  render(){
    const { redirect } = this.props;
    if ( redirect ) {
      const endpoint = '/voting-app/dashboard/';
      return ( 
        <Redirect to={ endpoint } />
      );
    }
    return (
      <div>
        <form action="/voting-app/login" encType="x-www-form-urlencoded" onSubmit={ this.handleSubmit } >
          
          <div> Enter username</div>
          <input type="text" name="uname" required /><br />
          <div> Enter Password </div>
          <div style={ styles.passwordGroup }>
            <input type="password" name="upassword" required />
            { 
              this.props.message !== "" && 
              <div style={ styles.message } > 
                { this.props.message }
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
  token:              state.currentState.token,
  redirect:           state.currentState.redirect,
});

export default connect(
  mapStateToProps
)( LoginForm );