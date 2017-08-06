import React from 'react';
import { connect } from 'react-redux';

const EditablePollItem = ( props ) => {
  const { poll, isHovering, id } = props;
  let { dateAdded } = poll;
  if( dateAdded ) dateAdded = dateAdded.toString().slice( 0,16 )
  return( 
    
    <div id={ poll.id } style={ isHovering ? styles.pollBorderHover : styles.pollBorder } >
      <div style={ styles.pollItemContainer } >
        <div style={ styles.pollItemTitle } > { poll.title } </div>
        <div style={ styles.pollItemDate } > Created On: { dateAdded } </div>
      </div>
    </div>
  );
}

const styles = {
  pollBorderHover:{
    margin:           '5px',
    cursor:           'pointer',
    padding:          '10px 5px',
    borderRadius:     '2px',
    boxShadow:        '0px 0px 5px #333',
    width:            '100%',
  },
  pollBorder:{
    margin:           '5px 0px',
    cursor:           'pointer',
    padding:          '10px 7px',
    cursor:           'pointer',
    borderRadius:     '2px',
    width:            '100%',
  },
  pollItemContainer:{
    margin:           '5px 5px 5px 5px',
    cursor:           'pointer',
    borderRadius:     '2px',
  },
  pollItemTitle:{
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontSize:         '1.2em',
    textTransform:    'uppercase',
  },
  pollItemDate:{
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontSize:         '0.8em',
    textTransform:    'uppercase',
  },
  
}

export default connect()( EditablePollItem );