import React from 'react';
import InlineCss from 'react-inline-css';
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import Moment from 'moment';

import datePickerStyles from 'react-datepicker/dist/react-datepicker.css';

import styles from './styles';
import selector from './selector.js';
import actions from './actions.js';

const NewGoalForm = React.createClass({

  propTypes: {
    pushGoal: React.PropTypes.func.isRequired,   // Actions...
    firebase: React.PropTypes.object.isRequired, // Selector...
  },

  getInitialState() {
    return {
      goalCount: 1
    }
  },

  getDataFromForm() {

    const name = this.refs.goalName.value;
    const startDate = +Moment();
    const endDate = +this.refs.goalEnd.getValue();
    const units = this.refs.goalUnits.value;
    const milestones = [];

    const data = {name, startDate, endDate, units, milestones};

    Array.apply(null, Array(this.state.goalCount)).forEach((bleh, index) => {
      data.milestones[index] = this.refs[`goalValue${index}`].value;
    });

    return data;
  },

  clearFormData() {
    this.refs.goalName.value = '';
    this.refs.goalEnd.value = '';
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
      this.props.firebase.authInfo.uid
    );
  },

  handlePutResult(success) {
    if(success) {
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
      <InlineCss stylesheet={styles + datePickerStyles} componentName="component">
        <h3>Add Goal</h3>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor='goalName'>Name</label></td>
                <td><input name='goalName' ref='goalName'></input></td>
              </tr>
              <tr>
                <td><label htmlFor='goalEnd'>End Date</label></td>
                <td>
                  <DatePicker 
                    ref="goalEnd"
                    minDate={Moment()}
                    placeholderText="The goal date" 
                    selected={Moment().add(1, 'month')} />
                </td>
              </tr>
              <tr>
                <td><label htmlFor='goalUnits'>Units</label></td>
                <td><input name='goalUnits' ref='goalUnits'></input></td>
              </tr>
              {Array.apply(null, Array(this.state.goalCount)).map((item, index) => (
                <tr key={index}>
                  <td><label htmlFor={`goalValue${index}`}>{this.getGoalName(index)}</label></td>
                  <td><input name={`goalValue${index}`} ref={`goalValue${index}`}></input></td>
                </tr>
              ))}
            </tbody>
          </table>
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