import actions from '../../actions';

const dispatcher = (dispatch) => {

  return {

    selectChallenge(challenge) {
      dispatch({type: actions.ui, subType: 'selectChallenge', challenge});
    }
    
  }
}

export default dispatcher;