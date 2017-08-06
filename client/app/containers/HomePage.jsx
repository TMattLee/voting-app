import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PollList from '../components/PollList.jsx';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import PollDisplay from '../components/PollDisplay.jsx';

import checkAuth from '../lib/checkAuth.js';
import initAuth from '../lib/initAuth.js'
import getPolls from '../lib/getPolls.js';
import displayModal from '../lib/displayModal.js';
import setPoll from '../lib/setPoll.js';

class HomePage extends Component{
  constructor( props ){
    super( props );
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setCurrentPoll = this.setCurrentPoll.bind(this);
    this.pollNumber = 0;
  }
  
  componentWillMount(){
    initAuth( this.props );
  }
  
  componentWillMount(){
    
    checkAuth( this.props );
    getPolls( this.props );
  }
  
  showModal(){
    displayModal( this.props, 'SHOW_DISPLAY_MODAL', true );
  }
  
  hideModal(){
    displayModal( this.props, 'SHOW_DISPLAY_MODAL', false );
  }
  
  setCurrentPoll( _id ){
    setPoll( this.props, _id );
    this.showModal();
  }
  
  render(){
    if(!this.props.polls ){
      return(
        <div style={ styles.contents } >
          This is where homepage stuff goes but there should be polls here... so maybe something went wrong :(
        </div>
      );
    }
    else{
      return (
        <div style={ styles.contents }>
          <Modal 
          isOpen={ this.props.showDisplayModal } 
          contentLabel="Modal"
          style={ styles.modalContainer } 
          onClick={ this.hideModal }
          onRequestClose={ this.hideModal } 
          shouldCloseOnOverlayClick={ true }
           >
          
          <PollDisplay hideModal={ this.hideModal } 
            poll={ this.props.polls.filter( ( item ) => {
                return item._id === this.props.currentPoll 
              }) } />
          
        </Modal>
          <PollList polls={ this.props.polls } setCurrentPoll={ this.setCurrentPoll } />
        </div>
      );
    }
  }
}

const styles ={
  contents:{
    display:          'flex',
    flexDirection:    'column',
    width:            '600px',
    margin:           '10px auto 0px auto',
    backgroundColor:  '#eee',
    borderRadius:     '2px',
  },
  modalContainer:{
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(128, 128, 128, 0.3)',
      zIndex            : 101,
    },
    content : {
      position                   : 'relative',
      top                        : '200px',
      left                       : '0px',
      right                      : '0px',
      bottom                     : '0px',
      margin                     : '10px auto',
      width                      : '900px',               
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px',
      boxShadow                  : '0px 0px 5px #333'
    }
  },
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  polls:              state.currentState.polls,
  currentPoll:        state.currentState.currentPoll,
  showDisplayModal:   state.currentState.showDisplayModal,
});

export default connect(
  mapStateToProps
)( HomePage );