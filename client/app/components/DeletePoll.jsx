import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux'

import deletePoll from '../lib/deletePoll.js';

class DeletePoll extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.hideDeleteModal();
    console.log('de', this.props.currentPoll)
    deletePoll( this.props, this.props.currentPoll );
  }
  render(){
    return (
      <div style={{width:'300px',height:'100px', margin:'10px auto'}}>
        <div style={ styles.modalHeader } > Confirm Delete</div>
        <div style={ styles.buttonGroup } >
          <div style={ styles.button } onClick={ this.handleClick } >Delete</div> 
          <div style={ styles.button } onClick={ this.props.hideDeleteModal } >Cancel</div>
        </div>
      </div>
    );
  }
}

const styles = {
  modalHeader:{
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontWeight:       'bold',
    textTransform:    'uppercase',
    fontSize:         '1.2em',
    textAlign:        'center',
  },
  buttonGroup:{
    display:          'flex',
    justifyContent:   'space-around',
    margin:           '30px'
  },
  button:{
    position:         'relative',
    width:            '120px',
    height:           '20px',
    margin:           '10px',
    padding:          '3px 5px',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    cursor:           'pointer',
    fontWeight:       'bold',
    textTransform:    'uppercase',
    boxShadow:        '0px 0px 2px #333'
  }
}

const mapStateToProps = ( state ) => ({
  currentPoll:        state.currentState.currentPoll,
});

export default connect( mapStateToProps )( DeletePoll );