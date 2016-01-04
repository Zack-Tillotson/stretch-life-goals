import actions from '../../actions';
import firebase from '../../firebase';

const dispatcher = (dispatch) => {

  return {

    incrementProgress(uiCallback, uid, goalId) {
      const path = `${uid}/goals/${goalId}/progress`;
      const callback = (success) => {
        uiCallback(success);
      }
      return firebase.pushData(uiCallback, {timestamp: Date.now()}, path);
    },

    decrementProgress(uiCallback, uid, goalId, progressId) {
      const path = `${uid}/goals/${goalId}/progress/${progressId}`;
      const callback = (success) => {
        uiCallback(success);
      }
      return firebase.remove(uiCallback, path);
    },
    
  }
}

export default dispatcher;