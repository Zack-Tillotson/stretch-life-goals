import actions from '../../actions';

const dispatcher = (dispatch) => {

  return {

    selectChallenge(challenge) {
      dispatch({type: actions.ui, subType: 'selectChallenge', challengeKey: challenge.key});
    }
    
  }
}

export default dispatcher;