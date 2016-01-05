import React from 'react';
import InlineCss from "react-inline-css";
import {connect} from 'react-redux';

import firebaseSelector from '../../firebase/selector';
import firebaseActions from '../../firebase/actions';
import styles from './styles.raw.less';

const Header = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <header>
          <a className="title" href="/">
            <h1>
              <div className="imageContainer">
                <img src="assets/logo.png" alt="Stretch: Life Goals" />
              </div>
            </h1>
          </a>
          <div className="accountManagement">
            {this.props.isLoggedIn && (
              <span className="accountInner">
                {!!this.props.name && (
                  <span className="username">Hi {this.props.name}</span>
                )}
                <span className="action logoutAction" onClick={this.props.requestLogout}>Log Out</span>
              </span>
            )}
          </div>
        </header>
      </InlineCss>
    );
  }
});

export default connect(firebaseSelector, firebaseActions)(Header);