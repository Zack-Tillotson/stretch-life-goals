import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import actions from './actions.js';

const NewChallengeForm = React.createClass({

  getDataFromForm() {
    const name = this.refs.challengeName.value;
    const startDate = this.refs.startDate.value;
    const endDate = this.refs.endDate.value;
    return {name, startDate, endDate};
  },

  clearFormData() {
    this.refs.challengeName.value = '';
    this.refs.startDate.value = '';
    this.refs.endDate.value = '';
  },

  handleSubmit(event) {
    event.preventDefault();
    const challengeData = this.getDataFromForm();
    this.props.pushChallenge(this.handlePutResult, challengeData, this.props.firebase.authInfo.uid);
  },

  handlePutResult(result) {
    const [callbackFn, data, newId] = result;
    if(newId) {
      this.clearFormData();
    }
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <h3>Create New Challenge</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='challengeName'>Name</label>
            <input name='challengeName' ref='challengeName'></input>
          </div>
          <div>
            <label htmlFor='startDate'>Start Date</label>
            <input name='startDate' ref='startDate'></input>
          </div>
          <div>
            <label htmlFor='endDate'>End Date</label>
            <input name='endDate' ref='endDate'></input>
          </div>
          <input type="submit" value="submit" />
        </form>
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(NewChallengeForm);