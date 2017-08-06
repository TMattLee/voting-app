import React from 'react';
import PollItem from './PollItem.jsx';
import ReactHoverObserver from 'react-hover-observer';
import { connect } from 'react-redux';

const PollList = ( props ) =>{
  const clickHandler = ( _id ) => {
    props.setCurrentPoll( _id )
  }
  if(props.polls.length > 0){
    const polls = props.polls.map( ( value, key ) => {
      // return poll list
      // ReactHoverObserver allows state changes when hovering over an item
      return <div onClick={  clickHandler.bind( this, value._id ) } key={ key } >
        <ReactHoverObserver shouldDecorateChildren= { true } 
          key={ key } > 
          
          <PollItem poll={ value }  key={ key }   /> 
        
        </ReactHoverObserver>
      </div>;
    });
    return(
      <div style={ styles.list} > { polls } </div>
    );
  }
  else{
    return <div>
      No polls to show yet.
    </div>
  }
}

const styles ={
  list:{
    height:           '95%',
    overflowY:        'scroll'
  }
}

export default connect()(PollList);