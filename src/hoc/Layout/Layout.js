import React from 'react';
import Header from '../../components/Header/Header';

const Layout = props => (
  <div className="container-fluid">
    <Header></Header>
    <div className="container-fluid">
      {props.children}
    </div>
  </div>
);

export default Layout;
