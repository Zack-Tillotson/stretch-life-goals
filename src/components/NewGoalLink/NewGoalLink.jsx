import React from 'react';
import InlineCss from 'react-inline-css';
import {connect} from 'react-redux';

import styles from './styles';
import actions from './actions.js';

const selector = (state) => {
  return {};
};

const NewGoalForm = React.createClass({

  propTypes: {
    requestAddGoalForm: React.PropTypes.func.isRequired // Actions...
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <div onClick={this.props.requestAddGoalForm}>
          + Add Goal
        </div>
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(NewGoalForm);