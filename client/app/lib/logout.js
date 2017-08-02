import {
  signOut
} from '../actions/index.js';

const logout = ( props ) => {
  props.dispatch( signOut() );
}

export default logout;