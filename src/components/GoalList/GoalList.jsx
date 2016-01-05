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

  incrementProgress(goalId) {
    this.props.incrementProgress(this.completedIncrement, this.props.firebase.uid, goalId);
  },

  completedIncrement() {

  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Your Goals</h3>
        {!!this.props.goals.length && (
          <ul>
            {this.props.goals.map((goal, index) => (
              <li key={goal.key}>
                <span className="openLink" onClick={this.props.requestGoalView.bind(this, goal.key)}>
                  <span className="progressAmt" style={{width: `${goal.percDone}%`}}></span>
                  <span className="name">{goal.name}</span>
                </span>
                <span className="progressBtn" onClick={this.incrementProgress.bind(this, goal.key)}>+</span>
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