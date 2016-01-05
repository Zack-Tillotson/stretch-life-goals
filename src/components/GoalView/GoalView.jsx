import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import actions from './actions';

const GoalView = React.createClass({

  propTypes: {
    hasActive: React.PropTypes.bool.isRequired,
    active: React.PropTypes.object.isRequired
  },

  getNextMilestone() {
    const progress = this.getProgress();
    return this.props.active.milestones.find(milestone => milestone > progress) || 
      this.props.active.milestones[this.props.active.milestones.length - 1];
  },

  getProgress() {
    const progress = this.props.active.progress || {};
    return Object.keys(progress).length;
  },

  incrementProgress() {
    this.props.incrementProgress(this.completedIncrement, this.props.firebase.uid, this.props.active.key);
  },

  completedIncrement(result) {

  },

  decrementProgress() {
    const progressIdKeys = Object.keys(this.props.active.progress)
    const progressId = progressIdKeys[progressIdKeys.length - 1];
    this.props.decrementProgress(
      this.completedDecrement, 
      this.props.firebase.uid, 
      this.props.active.key,
      progressId
    );
  },

  completedDecrement(result) {

  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>{this.props.active.name}</h3>
        <div>
          Active until {this.props.active.endDate}
        </div>
        <div>
          Next Milestone: {this.getNextMilestone()}
        </div>
        <div>
          Progress: {this.getProgress()}
        </div>
        <div onClick={this.incrementProgress}>
          Record Progress
        </div>
        {this.getProgress() > 0 && (
          <div onClick={this.decrementProgress}>
            Oops, remove last progress
          </div>
        )}
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(GoalView);