import { 
  setNotDone,  
} from '../actions/index.js';

const initAuth = ( props ) => {
  props.dispatch( setNotDone() );
}

export default initAuth;