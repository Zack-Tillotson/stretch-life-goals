import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import actions from './actions';

const GoalSelector = React.createClass({

  propTypes: {
    selected: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Goals</h3>
        {!!this.props.selected.challenge.goals.length && (
          <ul>
            {this.props.selected.challenge.goals.map((goal, index) => (
              <li>
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

export default connect(selector, actions)(GoalSelector);