import React, { Component } from 'react';
import addPoll from '../lib/addPoll.js'
import { connect } from 'react-redux';
import getPolls from '../lib/getPolls.js';

class CreatePoll extends Component {
  handleSubmit( event ){
    event.preventDefault();
    const title = event.target[0].value;
    const options = event.target[1].value.split('\n');
    addPoll( this.props, title, options );
    this.props.hideModal();
    getPolls( this.props );
  }
  render(){
    return(
      <div style={ styles.container } >
        <div style={ styles.modalTitle } >Add A New Poll</div>
        <form encType="x-www-form-urlencoded" onSubmit={ this.handleSubmit.bind( this ) } >
          <input type="text" 
            name="title" 
            placeholder="Poll Title" 
            style={ styles.modalText }
            required /> <br />
          <textarea
            name="options" 
            rows="10"
            placeholder="Poll choices ( line separated )" 
            style={ styles.modalText }
            required />  <br />
          <button type="submit"> Create Poll </button>
          <button onClick={ this.props.hideModal } > Cancel </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container:{
    width:            '100%',
    height:           '100%',
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
  },
  modalTitle:{
    color:            '#222',
    textDecoration:   'none',
    textTransform:    'uppercase',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontWeight:       'bold',
  },
  modalText:{
    width:            '400px',
    marginTop:        '20px',
    color:            '#222',
    textDecoration:   'none',
    textTransform:    'uppercase',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
  }
  
}

export default connect()( CreatePoll );