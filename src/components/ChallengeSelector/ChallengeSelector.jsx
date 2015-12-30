import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import actions from './actions';

const ChallengeSelector = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Challenges</h3>
        <ul>
          {this.props.challenges.map(challenge => (
            <li onClick={this.props.selectChallenge.bind(this, challenge)} key={challenge.key}>
              {challenge.information.name}: {challenge.information.startDate} - {challenge.information.endDate}
            </li>
          ))}
        </ul>
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(ChallengeSelector);