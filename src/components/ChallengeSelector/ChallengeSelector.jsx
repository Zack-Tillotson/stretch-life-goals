import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector';
import actions from './actions';

const ChallengeSelector = React.createClass({

  propTypes: {
    challenges: React.PropTypes.array.isRequired,     // Selector
    selectChallenge: React.PropTypes.func.isRequired  // Actions
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Challenges</h3>
        {!!this.props.challenges.length && (
          <ul>
            {this.props.challenges.map(challenge => (
              <li onClick={this.props.selectChallenge.bind(this, challenge)} key={challenge.key}>
                {challenge.information.name}: {challenge.information.startDate} - {challenge.information.endDate}
              </li>
            ))}
          </ul>
        ) || (
          <div>
            No Challenges, create one to get started!
          </div>
        )}
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(ChallengeSelector);