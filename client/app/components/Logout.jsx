import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import logout from '../lib/logout.js';
import { connect } from 'react-redux';

class Logout extends Component {
  constructor( props ){
    super( props );
    const cookies = new Cookies();
    cookies.remove( 'uuvvuuvv' );
  }
  componentDidMount(){
    logout( this.props );
  }
  
  render(){
    return <Redirect to="/voting-app/" />
  }
}

export default connect()( Logout );
