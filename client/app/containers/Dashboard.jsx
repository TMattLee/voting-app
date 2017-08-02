import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash'

import EditablePollList from '../components/EditablePollList.jsx';
import CreatePoll from '../components/CreatePoll.jsx';
import EditPoll from '../components/EditPoll.jsx';
import DeletePoll from '../components/DeletePoll.jsx';

import checkAuth from '../lib/checkAuth.js';
import initAuth from '../lib/initAuth.js'
import getPolls from '../lib/getPolls.js';
import displayModal from '../lib/displayModal';
import setPoll from '../lib/setPoll.js';
import deletePoll from '../lib/deletePoll.js';

class Dashboard extends Component {
  constructor( props ){
    super( props );
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.setCurrentPoll = this.setCurrentPoll.bind(this);
    this.removeCurrentPoll = this.removeCurrentPoll.bind(this);
  }
  
  componentWillMount(){
    initAuth( this.props );
  }
  
  componentDidMount(){
    checkAuth( this.props );
    getPolls( this.props );
  }
  
  componentDidUpdate( prevProps, prevState ){
    if( !_.isEqual( prevProps.polls, this.props.polls ) ){
      getPolls( this.props );
    }
  }
  
  showModal(){
    displayModal( this.props, 'SHOW_CREATE_MODAL', true );
  }
  
  hideModal(){
    displayModal( this.props, 'SHOW_CREATE_MODAL', false );
  }
  
  showEditModal( pollId){
    displayModal( this.props, 'SHOW_EDIT_MODAL', true );
  }
  
  hideEditModal( type ){
    displayModal( this.props, 'SHOW_EDIT_MODAL', false );
  }
  
  showDeleteModal( pollId){
    displayModal( this.props, 'SHOW_DELETE_MODAL', true );
  }
  
  hideDeleteModal( type ){
    displayModal( this.props, 'SHOW_DELETE_MODAL', false );
  }
  
  setCurrentPoll( _id ){
    setPoll( this.props, _id );
    this.showEditModal();
  }
  
  removeCurrentPoll( _id ){
    setPoll( this.props, _id );
    this.showDeleteModal();
  }
  
  render(){
    if( this.props.isAuthorized === false && this.props.done === false ){
      return (
        <div> Loading...</div>
      );
    }
    if( this.props.isAuthorized === false && this.props.done === true ){
      const endpoint = '/voting-app/login/' ; 
      return (
        <Redirect to={ endpoint } />
      );
    }
    return (
      <div style={ styles.contents } >
        
        <Modal 
          isOpen={ this.props.showCreateModal } 
          contentLabel="Modal"
          style={ styles.modalContainer }
          onRequestClose={ this.hideModal } 
          shouldCloseOnOverlayClick={ true } >
          
          <CreatePoll hideModal={ this.hideModal } />
        
        </Modal>
        
        <Modal 
          isOpen={ this.props.showEditModal } 
          contentLabel="Modal"
          style={ styles.modalContainer }
          onRequestClose={ this.hideEditModal } 
          shouldCloseOnOverlayClick={ true } >
          
          <EditPoll hideEditModal={ this.hideEditModal }
             showEditModal={ this.showEditModal }
             poll={ this.props.polls.filter( ( item ) => {
                return item._id === this.props.currentPoll 
              }) } />
        
        </Modal>
        
        <Modal 
          isOpen={ this.props.showDeleteModal } 
          contentLabel="Modal"
          style={ styles.modalContainer }
          onRequestClose={ this.hideDeleteModal } 
          shouldCloseOnOverlayClick={ true } >
          
          <DeletePoll hideDeleteModal={ this.hideDeleteModal }
             showDeleteModal={ this.showDeleteModal }
             poll={ this.props.polls.filter( ( item ) => {
                return item._id === this.props.currentPoll 
              }) } />
        
        </Modal>
        
        <EditablePollList
          showEditModal={ this.showEditModal }
          hideEditModal={ this.hideEditModal }
          hideDeleteModal={ this.hideDeleteModal }
          showDeleteModal={ this.showDeleteModal } 
          setCurrentPoll={ this.setCurrentPoll }
          removeCurrentPoll={ this.removeCurrentPoll }
          />
          
        <div  style={ styles.button } onClick={ this.showModal } > Create Poll </div>
      </div>
    );
  }
  
}

const styles ={
  contents:{
    display:          'flex',
    flexDirection:    'column',
    width:            '600px',
    margin:           '10px auto',
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
  button:{
    position:         'relative',
    width:            '120px',
    height:           '20px',
    margin:           '10px',
    padding:          '3px 5px',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',

    fontWeight:       'bold',
    textTransform:    'uppercase',
    boxShadow:        '0px 0px 2px #333'
  }
}

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  username:           state.currentState.username,
  userId:             state.currentState.userId,
  polls:              state.currentState.polls,
  currentPoll:        state.currentState.currentPoll,
  showCreateModal:    state.currentState.showCreateModal,
  showEditModal:      state.currentState.showEditModal,
  showDeleteModal:    state.currentState.showDeleteModal,
});

export default connect(
  mapStateToProps
)( Dashboard );