import {
  showModal
} from '../actions/index.js';

const displayModal = ( props, type, bool ) =>{
  props.dispatch( showModal( type, bool ) );
}

export default displayModal;