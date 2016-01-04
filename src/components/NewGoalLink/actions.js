import actions from '../../actions';
import firebase from '../../firebase';

const dispatcher = (dispatch, props) => {
  return {
    requestAddGoalForm() {
      dispatch({type: actions.ui, subType: 'addGoalForm'});
    }
  }
}

export default dispatcher;