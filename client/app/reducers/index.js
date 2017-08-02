import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';

const initialState ={
  isAuthorized:       false,
  done:               false,
  polls:              null,
  redirect:           false,
  message:            "",
  showCreateModal:    false,
  showEditModal:      false,
  showDisplayModal:   false,
  showDeleteModal:    false,
  currentPoll:        null,
  username:           null,
  userId:             null,          
}

function currentState( state=initialState,actions ){
  switch( actions.type ){
    case 'CHECK_LOGGED_IN':
      return Object.assign( {}, state, { 
        isAuthorized: actions.isAuthorized, 
        done:         actions.done, 
        redirect:     actions.redirect,
        username:     actions.username,
        userId:       actions.userId,
      });

    case 'SET_LOGGED_OUT':
      return Object.assign( {}, state, { 
        isAuthorized: actions.isAuthorized, 
        done:         actions.done, 
        redirect:     actions.redirect,
      });
      
    case 'SET_NOT_DONE':
      return Object.assign( {}, state, { 
        done:         actions.done, 
      });
      
    case 'GET_POLLS':
      return Object.assign( {}, state, { 
        polls:        actions.polls, 
      });
      
    case 'SIGN_IN':
      return Object.assign( {}, state, { 
        redirect:     actions.redirect,
        message:      actions.message,
        username:     actions.username,
      });
    
    case 'SIGN_UP':
      return Object.assign( {}, state, { 
        redirect:     actions.redirect,
        message:      actions.message,
        username:     actions.username,
      });
      
    case 'SIGN_OUT':
      return Object.assign( {}, state, initialState );
      
    case 'EDIT_MESSAGE':
      return Object.assign( {}, state, {
        message:      actions.message,
      });
    
    case 'SHOW_CREATE_MODAL':
      return Object.assign( {}, state, {
        showCreateModal:      actions.isOpen,
      });
      
    case 'SHOW_EDIT_MODAL':
      return Object.assign( {}, state, {
        showEditModal:      actions.isOpen,
      });
    
    case 'SHOW_DISPLAY_MODAL':
      return Object.assign( {}, state, {
        showDisplayModal:      actions.isOpen,
      });
      
    case 'SHOW_DELETE_MODAL':
      return Object.assign( {}, state, {
        showDeleteModal:      actions.isOpen,
      });
    
    case 'SET_CURRENT_POLL':
      return Object.assign( {}, state, {
        currentPoll:      actions.pollId,
      });
      
    default:
      return state;
  }
} 

const reducers = combineReducers({
 currentState
});

export default reducers;