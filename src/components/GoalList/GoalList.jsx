import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import actions from './actions';

const GoalList = React.createClass({

  propTypes: {
    goals: React.PropTypes.array.isRequired,
    requestGoalView: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Goals</h3>
        {!!this.props.goals.length && (
          <ul>
            {this.props.goals.map((goal, index) => (
              <li key={goal.key} onClick={this.props.requestGoalView.bind(this, goal.key)}>
                {goal.name}
              </li>
            ))}
          </ul>
        ) || (
          "No goals yet - add one!"
        )}
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(GoalList);