import React from 'react';
import {connect} from 'react-redux';
import InlineCss from "react-inline-css";

import selector from './selector';
import actions from './actions';
import styles from './styles.raw.less';

const BreadCrumbNav = React.createClass({

  resetView() {
    this.props.resetView();
  },

  getBreadCrumbLink() {
    if(!this.props.firebase.isLoggedIn || this.props.ui.view.goalList) {
      return null;
    }
    else if(this.props.ui.view.goal || this.props.ui.view.addGoal) {
      return (
        <div onClick={this.resetView}>
          ➥ Back
        </div>
      );
    }
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        {this.getBreadCrumbLink()}
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(BreadCrumbNav);