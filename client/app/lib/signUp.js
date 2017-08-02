import {
  signUp
} from '../actions/index.js';

const register = ( props, uid, pw ) => {
  props.dispatch( signUp( uid, pw ) );
}

export default register;