import {
  addNewPoll
} from '../actions/index.js';
import Cookies from 'universal-cookie';

const addPoll = ( props, title, options ) => {
  const cookies = new Cookies();
  const authCookie = cookies.get('uuvvuuvv');
  props.dispatch( addNewPoll( title, options, authCookie ) );
}

export default addPoll;