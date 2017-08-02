import {
  editExistingPoll
} from '../actions/index.js';
import Cookies from 'universal-cookie';

const editPoll = ( props, title, pollId, options ) => {
  const cookies = new Cookies();
  const authCookie = cookies.get('uuvvuuvv');
  props.dispatch( editExistingPoll( title, pollId, options, authCookie ) );
}

export default editPoll;