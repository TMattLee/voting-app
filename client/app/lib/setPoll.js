import {
  setCurrentPoll
} from '../actions/index.js';

const setPoll = ( props, pollId ) =>{
  props.dispatch( setCurrentPoll( pollId ) );
}

export default setPoll;