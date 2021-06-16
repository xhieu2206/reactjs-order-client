import React from 'react';
import { LOGO_URL } from '../../../constants/URLs';
import { Link } from 'react-router-dom';

const Brand = (props) => (
  <Link className="navbar-brand" to="/categories">
    <img width="auto" height="40" src={LOGO_URL} alt="logo"/>
  </Link>
);

export default Brand;
