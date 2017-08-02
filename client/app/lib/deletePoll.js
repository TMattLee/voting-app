import {
  deleteExistingPoll
} from '../actions/index.js';
import Cookies from 'universal-cookie';

const deletePoll = ( props, pollId ) => {
  const cookies = new Cookies();
  const authCookie = cookies.get('uuvvuuvv');
  props.dispatch( deleteExistingPoll( pollId, authCookie ) );
}

export default deletePoll;