import actions from '../../actions';
import firebase from '../../firebase';

const dispatcher = (dispatch) => {

  return {

    requestGoalView(key) {
      dispatch({type: actions.ui, subType: 'selectGoal', key});
    },

    incrementProgress(uiCallback, uid, goalId) {
      const path = `${uid}/goals/${goalId}/progress`;
      const callback = (success) => {
        uiCallback(success);
      }
      return firebase.pushData(uiCallback, {timestamp: Date.now()}, path);
    },
    
  }
}

export default dispatcher;