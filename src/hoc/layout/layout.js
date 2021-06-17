import React from 'react';
import Header from '../../components/header/header';
import Modal from '../../components/UI/modal/modal';

const Layout = props => (
  <div className="container-fluid">
    <Header />
    <Modal show={true} />
    <div className="container-fluid">
      {props.children}
    </div>
  </div>
);

export default Layout;
