import actions from '../../actions';
import firebase from '../../firebase';

// Don't use these methods directly, rather rhis dispatcher should be attached to a 'connected' component, ie:
//
// import actions from '../firebase/actions';
// import actions from '../firebase/selector';
// ...
// export default connect(selector, actions)(Page);

const dispatcher = (dispatch) => {

  function dispatchData(data) {
    dispatch({type: actions.challenge, ...data});
  }

  return {

    pushChallenge(uiCallback, challengeData, path) {

      const callback = () => {
        uiCallback(arguments);
        dispatchData(arguments);
      }

      const data = {
        information: challengeData
      };

      return firebase.pushData(callback, data, path);
    }

  }
}

export default dispatcher;