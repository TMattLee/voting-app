import axios from 'axios';
import Cookies from 'universal-cookie';
import { 
  checkLoggedIn, 
  setNotDone,  
  setLoggedOut 
} from '../actions/index.js';

const checkAuth = ( props ) => {
  const cookie = new Cookies();
  const authCookie = cookie.get('uuvvuuvv');
  if(authCookie !== undefined){
    props.dispatch( checkLoggedIn( authCookie ) );
  }
  else{
    props.dispatch(  setLoggedOut() );
  }
}

export default checkAuth;