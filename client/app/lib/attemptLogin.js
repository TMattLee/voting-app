import {
  signIn
} from '../actions/index.js';

const attemptLogin = ( props, info ) => {
  props.dispatch( signIn( info ) );
}

export default attemptLogin;