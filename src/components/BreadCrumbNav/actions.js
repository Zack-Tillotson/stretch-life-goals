import actions from '../../actions';

const dispatcher = (dispatch) => {

  return {

    resetView(key) {
      dispatch({type: actions.ui, subType: 'navigateHome'});
    }
    
  }
}

export default dispatcher;