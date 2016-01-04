import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import GoalSelector from '../GoalSelector';
import NewGoalForm from '../NewGoalForm';

import styles from './styles';
import selector from './selector.js';
import actions from './actions';

const ChallengeView = React.createClass({

  propTypes: {
    selectChallenge: React.PropTypes.func.isRequired
  },

  render() {
    const info = this.props.challenge.challenge.information;
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <div className="challengeMeta">
          <h3>{info.name}</h3>
          <div className="timeframe">From {info.startDate} to {info.endDate}</div>
        </div>
        <div className="goalList">
          <GoalSelector />
          <NewGoalForm />
        </div>
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(ChallengeView);