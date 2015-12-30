import {combineReducers} from 'redux';
import firebase from '../../firebase/reducer';
import actions from '../../actions';

const challenges = (state = [], action) => {
  switch(action.type) {
    case actions.firebase:
      if(!/^.info/.test(action.path)) {
        state = Object.keys(action.data).map(key => {
          return {...action.data[key], key};
        });
      }
      break;
  }
  return state;
}

function getInitialUiState() {
  return {active: {}};
}
const ui = (state = getInitialUiState(), action) => {
  switch(action.type) {
    case actions.ui:
      if(action.subType == 'selectChallenge') {
        state = {...state, active: action.challenge};
      }
      break;
  }
  return state;
}

export default combineReducers({firebase, challenges, ui});