import actions from '../../actions';

const dispatcher = (dispatch) => {

  return {

    requestGoalView(key) {
      dispatch({type: actions.ui, subType: 'selectGoal', key});
    }
    
  }
}

export default dispatcher;