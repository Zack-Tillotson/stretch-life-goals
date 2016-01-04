import actions from '../../actions';
import firebase from '../../firebase';

// Don't use these methods directly, rather rhis dispatcher should be attached to a 'connected' component, ie:
//
// import actions from '../firebase/actions';
// import actions from '../firebase/selector';
// ...
// export default connect(selector, actions)(Page);

const dispatcher = (dispatch) => {

  return {

    pushChallenge(uiCallback, challengeData, path) {

      const data = {
        information: challengeData
      };

      return firebase.pushData(uiCallback, data, path);
    }

  }
}

export default dispatcher;