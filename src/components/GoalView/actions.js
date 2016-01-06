import actions from '../../actions';
import firebase from '../../firebase';

const dispatcher = (dispatch) => {

  return {

    incrementProgress(uiCallback, uid, goalId) {
      const path = `${uid}/goals/${goalId}/progress`;
      return firebase.pushData(uiCallback, {timestamp: Date.now()}, path);
    },

    decrementProgress(uiCallback, uid, goalId, progressId) {
      const path = `${uid}/goals/${goalId}/progress/${progressId}`;
      return firebase.remove(uiCallback, path);
    },

    removeGoal(uid, goalId) {
      const path = `${uid}/goals/${goalId}`;
      const callback = (success) => {
        
      }
      return firebase.remove(callback, path);
    }
    
  }
}

export default dispatcher;