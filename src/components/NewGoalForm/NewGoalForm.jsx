import React from 'react';
import InlineCss from 'react-inline-css';
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import actions from './actions.js';

const NewGoalForm = React.createClass({

  propTypes: {
    pushGoal: React.PropTypes.func.isRequired,   // Actions...
    firebase: React.PropTypes.object.isRequired, // Selector...
    selected: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      goalCount: 1
    }
  },

  getDataFromForm() {

    const name = this.refs.goalName.value;
    const units = this.refs.goalUnits.value;
    const milestones = [];

    const data = {name, units, milestones};

    Array.apply(null, Array(this.state.goalCount)).forEach((bleh, index) => {
      data.milestones[index] = this.refs[`goalValue${index}`].value;
    });

    return data;
  },

  clearFormData() {
    this.refs.goalName.value = '';
    this.refs.goalUnits.value = '';
    this.refs.goalValue0.value = '';
    this.setState({goalCount: 1});
  },

  handleSubmit(event) {
    event.preventDefault();
    const data = this.getDataFromForm();
    this.props.pushGoal(
      this.handlePutResult, 
      data,
      this.props.firebase.authInfo.uid,
      this.props.selected.challenge.key
    );
  },

  handlePutResult(success) {
    if(success) {
      this.clearFormData();
    } else {
      // TODO
    }
  },

  getGoalName(index) {
    return index == 0 ? 'Base Goal' : `Stretch Goal ${index}`;
  },

  addGoal() {
    this.setState({goalCount: this.state.goalCount + 1});
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Add Goal</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='goalName'>Name</label>
            <input name='goalName' ref='goalName'></input>
          </div>
          <div>
            <label htmlFor='goalUnits'>Units</label>
            <input name='goalUnits' ref='goalUnits'></input>
          </div>
          {Array.apply(null, Array(this.state.goalCount)).map((item, index) => (
            <div key={index}>
              <label htmlFor={`goalValue${index}`}>{this.getGoalName(index)}</label>
              <input name={`goalValue${index}`} ref={`goalValue${index}`}></input>
            </div>
          ))}
          <div onClick={this.addGoal}>
            + Add Stretch Goal
          </div>
          <input type="submit" value="submit" />
        </form>
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(NewGoalForm);