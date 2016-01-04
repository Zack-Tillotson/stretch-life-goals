import React from 'react';
import {connect} from 'react-redux';

import InlineCss from 'react-inline-css';
import styles from './styles';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import DevTools from '../state/DevTools';

import firebase from '../firebase';
import actions from '../firebase/actions';
import firebaseSelector from '../firebase/selector';

import {challenge as challengeSelector} from '../state/selector';

import LoginForm from '../components/LoginForm';
import FirebaseStatus from '../components/FirebaseStatus';
import ChallengeSelector from '../components/ChallengeSelector';
import NewChallengeForm from '../components/NewChallengeForm';
import ChallengeView from '../components/ChallengeView';

const selector = (state) => {
  const firebase = firebaseSelector(state);
  const challenge = challengeSelector(state);
  return {firebase, challenge};
}

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

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <Header />
        <Body>
          <LoginForm />
          {this.props.firebase.isLoggedIn && (
            !!this.props.challenge.hasSelection && (
                <ChallengeView />
            ) || (
              <div>
                <ChallengeSelector />
                <NewChallengeForm />
              </div>
            )
          )}
          <FirebaseStatus />
        </Body>
        <Footer />
        <DevTools />
      </InlineCss>
    );
  }
});

export default connect(selector, actions)(Page);