import { 
  getPollsFromDatabase
} from '../actions/index.js';

const getPolls = ( props ) =>{
  props.dispatch( getPollsFromDatabase() );
}

export default getPolls;