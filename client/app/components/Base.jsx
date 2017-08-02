import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { connect } from 'react-redux';

const Base = ( props ) => {
  console.log('props ', props );
  return(
    <div>
      <Header location={ props.history.location } />
        <div style={ styles.container } >
          { renderRoutes( props.route.routes ) }
        </div>
      <Footer />
    </div>
  );
}

const styles = {
  container:{
    display:          'flex',
    flexDirection:    'column',
    width:            '800px',
    minHeight:        '600px',
    margin:           '70px auto 10px auto',
    backgroundColor:  '#eee',
    borderRadius:     '2px',
    boxShadow:        '0px 0px 2px',
  },
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
});

export default connect(
  mapStateToProps
)( Base );