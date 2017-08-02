import {
  addVote
} from '../actions/index.js';

import getCookie from './getCookie.js'

const doVoteAction = ( props, uid, _id, itemId ) => {
  const authCookie = getCookie();
  props.dispatch( addVote( uid, _id, itemId ) )
}

export default doVoteAction;