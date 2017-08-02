import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux'
import doVoteAction from '../lib/doVoteAction.js';

const PollDisplay = ( props ) => {
  const poll = props.poll[0];
  const { title, options, _id } = poll;
  
  const getRandom  = () => {
    return Math.floor(Math.random()*256);
  }
  
  console.log('modal props ', props)
  
  const populateList = ( listOptions ) => {
    return listOptions.map( ( val, key ) => {
      return <option value= { key } key={ key } > { val.itemName } </option>
    })
  }
  
  const vote = ( event  ) => {
    event.preventDefault();
    console.log(event.target[ 0 ].value)
    event.stopPropagation();
    const element = event.target[ 0 ].value;
    const _itemId = poll.options[ element ]._id;
    console.log('voteactions are ', _id,  _itemId, poll, props );
    let uid = null;
    if( props.isAuthorized ) uid = props.username;
    doVoteAction( props, uid, _id, _itemId );
  }
  
  
  let data = {
    labels: [],
    datasets: [{
      label: 'Dataset 1',
      data:  [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    }],
  };
  
  options.map( ( val, key ) => {
    let c1 = getRandom();
    let c2 = getRandom();
    let c3 = getRandom();
    data.labels.push(val.itemName);
    data.datasets[0].data.push(val.count);
    data.datasets[0].backgroundColor.push('rgb(' + c1 +',' + c2 + ',' + c3 + ')');
    data.datasets[0].hoverBackgroundColor.push('rgb(' + c1 +',' + c3 + ',' + c2 + ')');
  })
  
  return (
    <div style={{width:'800px',height:'330px', margin:'10px auto'}}>
      <div style={ styles.pollItemTitle } > { title } </div>
      <div>
        <div style={ styles.voteLeft } >
          <Doughnut 
            data={data} 
            width={300} 
            height={300}
            redraw = {true}
            responsive ={false}
            options={{
          		maintainAspectRatio: false
          	}}
          />
        </div>
        <div style={ styles.voteRight } >
          <form encType="x-www-form-urlencoded" onSubmit={ vote } >
            <select> 
              { populateList( options ) }
            </select>
            <button type="submit" > Submit </button>
            <button onClick={ props.hideModal } > Cancel </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

const styles = {
  voteLeft:{
    display:          'block',
    float:            'left',
    
  },
  voteRight:{
    display:          'block',
    float:            'right',
  },
  cancelButton:{
    width:            '100px',
    height:           '20px',
    backgroundColor:  'orange',
    cursor:           'pointer',
  },
  pollItemTitle:{
    textAlign:        'center',
    textTransform:    'uppercase',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontSize:         '1.2em',
    textTransform:    'uppercase',
  },
}
const mapStateToProps = ( state ) => ({
  username:           state.currentState.username,
  isAuthorized:       state.currentState.isAuthorized,
})

export default connect( mapStateToProps )( PollDisplay );