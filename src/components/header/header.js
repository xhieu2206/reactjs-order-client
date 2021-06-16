import React from 'react';
import {connect} from 'react-redux';

import Brand from './brand/brand';
import NavigationItems from './navigationItems/navigation-items';

const Header = props => {
  const { isLoggedIn, user } = props
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <Brand />
        <NavigationItems isLoggined={isLoggedIn} user={user} />
      </div>
    </nav>
  )
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(Header);
