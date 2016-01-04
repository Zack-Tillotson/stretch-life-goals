import actions from '../../actions';
import firebase from '../../firebase';

const dispatcher = (dispatch, props) => {

  const resetUi = () => {
    dispatch({type: actions.ui, subType: 'newGoalSuccess'});
  }

  return {

    pushGoal(uiCallback, data, uid) {
      const path = `${uid}/goals`;
      const callback = (success) => {
        if(success) {
          resetUi();
        }
        uiCallback(success);
      }
      return firebase.pushData(callback, data, path);
    }

  }
}

export default dispatcher;