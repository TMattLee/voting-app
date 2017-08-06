import React, { Component } from 'react';
import editPoll from '../lib/editPoll.js'
import { connect } from 'react-redux';
import getPolls from '../lib/getPolls.js';

class EditPoll extends Component {
  handleSubmit( event ){
    event.preventDefault();
    const title = event.target[0].value;
    const options = event.target[1].value.split('\n');
    const { currentPoll, polls } = this.props;
    editPoll( this.props, title, currentPoll, options )
    console.log('this', this)
    this.props.hideEditModal();
  }
  
  render(){
    const { currentPoll, polls } = this.props;
    const pollItems = polls.filter( ( item ) => {
      return item._id === currentPoll 
    });
    let optionString = ''
    const poll = pollItems[0];
    poll.options.map( ( value, key ) => {
      if( key !== poll.options.length - 1 ){
        optionString += value.itemName + '\n';
      } 
      else{
        optionString += value.itemName;
      }
    })
    return(
      <div style={ styles.container } >
        <div style={ styles.modalTitle } >EditPoll</div>
        <form encType="x-www-form-urlencoded" onSubmit={ this.handleSubmit.bind( this ) } >
          <input type="text" 
            name="title" 
            defaultValue={ poll.title }
            placeholder="Poll Title" 
            style={ styles.modalText }
            required /> <br />
          <textarea
            name="options" 
            rows="10"
            defaultValue={ optionString }
            placeholder="Poll choices ( line separated )" 
            style={ styles.modalText }
            required />  <br />
          <button type="submit"> Edit Poll </button>
          <button onClick={ this.props.hideEditModal } > Cancel </button>
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

const mapStateToProps = ( state ) => ({
  isAuthorized:       state.currentState.isAuthorized,
  done:               state.currentState.done,
  message:            state.currentState.message,
  polls:              state.currentState.polls,
  currentPoll:        state.currentState.currentPoll,
  showDisplayModal:   state.currentState.showDisplayModal,
});

export default connect( mapStateToProps )( EditPoll );