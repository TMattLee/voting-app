import {
  editMessage
} from '../actions/index.js';

const updateMessage = ( props, message ) => {
  props.dispatch( editMessage( message ) );
}

export default updateMessage;