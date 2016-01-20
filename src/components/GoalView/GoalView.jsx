import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';
import moment from 'moment';

import ProgressGraph from '../ProgressGraph';

import styles from './styles';
import selector from './selector.js';
import actions from './actions';

const GoalView = React.createClass({

  propTypes: {
    hasActive: React.PropTypes.bool.isRequired,
    active: React.PropTypes.object.isRequired
  },

  getMilestones() {
    
    const progress = this.getProgressValue();
    let foundActive = false;

    const milestones = this.props.active.milestones.map(milestone => {
      
      const isComplete = milestone <= progress;
      const isActive = !foundActive && !isComplete;

      if(isActive) {
        foundActive = true;
      }

      const completeClass = isComplete ? 'complete' : '';
      const activeClass = isActive ? 'active' : '';

      return {value: milestone, completeClass, activeClass};
    });


    return (
      <div className="milestones">
        <div className="milestoneTitle">Milestones:</div>
        {milestones.map(milestone => (
          <div 
            key={milestone.value}
            className={["milestone", milestone.completeClass, milestone.activeClass].join(" ")}>
            {milestone.value}
          </div>
        ))}  
      </div>
    );
  },

  getProgress() {
    return (
      <div className="progressSection">
        Progress: {this.getProgressValue()}
        {this.getProgressGraph()}
      </div>
    );
  },

  getProgressValue() {
    const progress = this.props.active.progress || {};
    return Object.keys(progress).length;
  },

  getProgressGraph() {
    const {progress, milestones, startDate, endDate} = this.props.active;
    return (
      <ProgressGraph 
        progress={progress} 
        milestones={milestones}
        startDate={startDate}
        endDate={endDate} />
    );
  },

  incrementProgress() {
    this.props.incrementProgress(
      this.completedIncrement, 
      this.props.firebase.uid, 
      this.props.active.key
    );
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

  getTimePeriodSummary() {
    return (
      <div className="timePeriods">
        From {this.getStartDate()} to {this.getEndDate()} ({this.getGoalDuration()} days)
      </div>
    );
  },

  getStartDate() {
    const {startDate} = this.props.active;
    return moment(startDate).format('MMM d, YYYY');
  },

  getEndDate() {
    const {endDate} = this.props.active;
    return moment(endDate).format('MMM d, YYYY');
  },

  getGoalDuration() {
    const {startDate, endDate} = this.props.active;
    return moment(endDate).diff(startDate, 'days');
  },

  removeGoal() {
    this.props.removeGoal(this.props.firebase.uid, this.props.active.key);
  },

  getControls() {
    return (
      <div className="controls">
        <div className="control" onClick={this.incrementProgress}>
          <span className="controlIcon">+</span> Add Progress
        </div>
        {this.getProgressValue() > 0 && (
          <div className="control" onClick={this.decrementProgress}>
            <span className="controlIcon">-</span> Remove Progress
          </div>
        )}
        <div className="control delete" onClick={this.removeGoal}>
          <span className="controlIcon">x</span>Delete Goal
        </div>
      </div>
    );
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Goal: {this.props.active.name}</h3>
        {this.getTimePeriodSummary()}
        {this.getMilestones()}
        {this.getProgress()}
        {this.getControls()}
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(GoalView);