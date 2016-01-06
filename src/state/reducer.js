import {combineReducers} from 'redux';
import firebaseMeta from '../firebase/reducer';
import actions from '../actions';

const firebaseData = (state = {}, action) => {
  switch(action.type) {
    case actions.firebase:
      if(!/^.info/.test(action.path)) {
        state = action.data;
      }
      break;
  }
  return state;
}

function getInitialUiState() {
  return {
    viewName: 'goalList',
    selectedGoal: ''
  };
}
const ui = (state = getInitialUiState(), action) => {
  switch(action.type) {
    case actions.ui:
      if(action.subType == 'addGoalForm') {
        state = {...state, viewName: 'addGoal'};
      } else if(action.subType == 'newGoalSuccess') {
        state = {...state, viewName: ''};
      } else if(action.subType == 'navigateHome') {
        state = {...state, viewName: ''};
      } else if(action.subType == 'selectGoal') {
        state = {...state, active: action.key, viewName: 'goal'};
      }
      break;
    case actions.firebase:
      if(!/^.info/.test(action.path)) {
        if(!action.data.goals ||
          !Object.keys(action.data.goals).find(key => key == state.active)) {
          state = {...state, ...getInitialUiState()};
        }
      }
      break;
  }
  return state;
}

export default combineReducers({firebaseMeta, firebaseData, ui});