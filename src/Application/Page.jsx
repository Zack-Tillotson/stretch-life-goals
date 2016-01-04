import React from 'react';
import {connect} from 'react-redux';

import InlineCss from 'react-inline-css';
import styles from './styles';

import Header from '../components/Header';
import BreadCrumbNav from '../components/BreadCrumbNav';
import Body from '../components/Body';
import Footer from '../components/Footer';
import DevTools from '../state/DevTools';

import firebase from '../firebase';
import actions from '../firebase/actions';
import selector from './selector';

import LoginForm from '../components/LoginForm';
import FirebaseStatus from '../components/FirebaseStatus';
import GoalList from '../components/GoalList';
import NewGoalLink from '../components/NewGoalLink';
import NewGoalForm from '../components/NewGoalForm';
import GoalView from '../components/GoalView';


const Page = React.createClass({

  componentDidMount() {
    this.props.monitorConnection();
  },

  componentWillReceiveProps(newProps) {
    if(newProps.firebase.uid != this.props.firebase.uid) {
      this.syncWithUserData(newProps.firebase.uid);
    }
  },

  syncWithUserData(uid) {
    if(this.userDataRef) {
      this.userDataRef.off();
    }
    this.userDataRef = this.props.syncData(uid);
  },

  getCurrentView() {
    if(!this.props.firebase.isLoggedIn) {
      return (
        <LoginForm />
      );
    }
    else if(this.props.ui.view.goal) {
      return (
        <GoalView />
      );
    } else if(this.props.ui.view.addGoal) {
      return (
        <NewGoalForm />
      );
    } else {
      return (
        <div>
          <GoalList />
          <NewGoalLink />
        </div>
      );
    }
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <Header />
        <Body>
          <BreadCrumbNav />
          {this.getCurrentView()}
          <FirebaseStatus />
        </Body>
        <Footer />
        <DevTools />
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(Page);