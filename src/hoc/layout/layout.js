import React from 'react';
import Header from '../../components/header/header';

const Layout = props => (
  <div className="container-fluid">
    <Header />
    <div className="container-fluid">
      {props.children}
    </div>
  </div>
);

export default Layout;
