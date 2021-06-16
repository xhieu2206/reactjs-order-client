import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './navigation-items.module.css';
import { logout } from '../../../store/actions/auth';

const NavigationItems = props => {
  const onLogoutClickedHandler = () => {
    props.onLogout();
    props.history.push('/categories');
  }

  let items = (
    <>
      <li className="nav-item">
        <NavLink activeClassName='active' exact to={`/orders`} className="nav-link">Your Orders</NavLink>
      </li>
      <li className="nav-item" onClick={onLogoutClickedHandler}>
        <p className={["nav-link", classes.NavLink].join(' ').trim()}>Logout</p>
      </li>
    </>
  );
  if (!props.isLoggined) {
    items = <li className="nav-item">
      <NavLink activeClassName='active' exact to={`/login`} className="nav-link">Login</NavLink>
    </li>
  }
  return (
    <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink activeClassName='active' to={`/categories`} className="nav-link">Categories</NavLink>
        </li>
        { items }
      </ul>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(NavigationItems));
