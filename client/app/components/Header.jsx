import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render(){
    const { props } = this;
    const { location } = props;
    if( props.isAuthorized ){
      return(
        <div style={ styles.headerContainer } >
          <div style={ styles.headerContent } >
            <div style={ styles.headerContentLeft }> 
              <div style={ styles.tabStyle } > 
                Welcome, { props.username } 
              </div>
            </div>
            <div style={ styles.headerContentRight }>
            
              <NavLink exact to="/voting-app/" 
                activeStyle={ styles.activeStyle } 
                style={ styles.tabStyle } >Home</NavLink> 
                
              <span style={ styles.tabStyle } > | </span>
              
              <NavLink to="/voting-app/dashboard" 
                activeStyle={ styles.activeStyle } 
                style={ styles.tabStyle } >Dashboard</NavLink>
                
              <span style={ styles.tabStyle } > | </span>
              
              <NavLink to="/voting-app/logout" 
              activeStyle={ styles.activeStyle } 
              style={ styles.tabStyle } >Log Out</NavLink> 
              
            </div>
          </div>
        </div>
      );
    }
    return(
      <div style={ styles.headerContainer } >
        <div style={ styles.headerContent } >
          <div style={ styles.headerContentLeft }> 
          
            <NavLink to="/voting-app/login" 
              activeStyle={ styles.activeStyle }
              style={ styles.tabStyle } >Login</NavLink>
              
            <span style={ styles.tabStyle } > | </span>
            
            <NavLink to="/voting-app/signup" 
              activeStyle={ styles.activeStyle }
              style={ styles.tabStyle } >SignUp</NavLink> 
          </div>
          <div style={ styles.headerContentRight }>
            
              <NavLink exact to="/voting-app/" 
                activeStyle={ styles.activeStyle } 
                style={ styles.tabStyle } >Home</NavLink> 
                
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
  headerContainer:{
    display:          'flex',
    justifyContent:   'space-around',
    width:            '100%',
    margin:           '0px 0px 10px 0px',
    backgroundColor:  '#e8e8e8',
    boxShadow:        '0px 0px 2px',
    position:         'fixed',
    zIndex:           '100',
    top:              '0',
    left:             '0',
    right:            '0',
    height:           '80px',
  },
  headerContent:{
    width:            '790px',
    margin:           '30px auto',
  },
  headerContentLeft:{
    float:            'left',
  },
  headerContentRight:{
    float:            'right',
  },
  activeStyle:{
    color:            '#222',
    textDecoration:   'none',
    textTransform:    'uppercase',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontColor:        '#888',
    borderBottom:     '2px solid #222'
  },
  tabStyle:{
    color:            '#222',
    textDecoration:   'none',
    textTransform:    'uppercase',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif'
  },
  fadedTabStyle:{
    color:            '#ccc',
    textDecoration:   'none',
    textTransform:    'uppercase',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif'
  },
  
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  username:           state.currentState.username
});

export default connect(
  mapStateToProps
)( Header );