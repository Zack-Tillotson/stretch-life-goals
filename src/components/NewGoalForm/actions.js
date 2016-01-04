import actions from '../../actions';
import firebase from '../../firebase';

const dispatcher = (dispatch, props) => {

  return {

    pushGoal(uiCallback, data, uid, challengeId) {
      const path = `${uid}/${challengeId}/goals`;
      return firebase.pushData(uiCallback, data, path);
    }

  }
}

export default dispatcher;