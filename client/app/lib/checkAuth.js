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
    console.log('there be a cookie')
    props.dispatch( checkLoggedIn( authCookie ) );
  }
  else{
     console.log('no cookie')
    props.dispatch(  setLoggedOut() );
  }
}

export default checkAuth;