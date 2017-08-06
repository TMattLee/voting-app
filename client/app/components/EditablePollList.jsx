import React from 'react';
import EditablePollItem from './EditablePollItem.jsx';
import ReactHoverObserver from 'react-hover-observer';
import { connect } from 'react-redux';

const EditablePollList = ( props ) =>{
  const startDelete = ( _id ) =>{
    props.removeCurrentPoll( _id )
  }
  
  const clickHandler = ( _id ) => {
    props.setCurrentPoll( _id )
  }
  
  if( props.polls && props.polls.length > 0){
    // filter polls by user id
    let editablePolls = props.polls.filter( ( item ) => {
      return item.uid === props.userId
    });
    
    // return poll list
    // ReactHoverObserver allows state changes when hovering over an item
    const polls = editablePolls.map( ( value, key ) => {
      return <div className="poll-item" style={ styles.pollListItem }  key={ key } >
        <div style={ styles.pollListLeft } onClick={ clickHandler.bind( this, value._id) }  key={ key } >
          <ReactHoverObserver shouldDecorateChildren= { true } key={ key } > 
            <EditablePollItem poll={ value }  key={ key } showEditModal={  props.showEditModal } /> 
          </ReactHoverObserver>
        </div>
        <img src="/voting-app/dist/assets/images/delete.png" 
          onClick={ startDelete.bind( this, value._id ) } 
          style={ styles.deleteButton } /> 
      </div>;
    });
  
    return(
      <div className="poll-list"  style={ styles.list} > 
        { polls }
      </div>
    );
  }
  else{
    return <div>
      There are currently no polls.
    </div>
  }
}

const styles ={
  list:{
    height:           '95%',
    overflowY:        'scroll'
  },
  pollListItem:{
    width:            '100%',
    display:          'inline-block',
  },
  pollListLeft:{
    float:            'left',
    width:            '90%',
  },
  deleteButton:{
    margin:           '25px 5px 5px 5px',
    float:            'right',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontSize:         '1.2em',
    textTransform:    'uppercase',
    width:            '25px',
    height:           '25px',
    float:            'right',
    cursor:           'pointer',
  },
}

const mapStateToProps = ( state ) => ({
  polls:              state.currentState.polls,
  userId:             state.currentState.userId,
  username:           state.currentState.username,
});

export default connect( mapStateToProps )( EditablePollList );