import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import { ENTRY_POINT } from '../../constants/URLs';
import ProductDetail from '../../components/productDetail/product-detail';
import authGuard from '../../hoc/authGuard/auth-guard';
import OrderForm from '../../components/orderForm/order-form';
import classes from './create.module.css'

const Create = (props) => {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const { match, history } = props;

  useEffect(() => {
    const productId = match.params["productId"];
    axios.get(`${ENTRY_POINT}/products/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [match, history, location]);

  return (
    <div className={classes.OrderCreateContainer}>
      <ProductDetail product={product} />
      <OrderForm product={product} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(authGuard(Create, true)));
