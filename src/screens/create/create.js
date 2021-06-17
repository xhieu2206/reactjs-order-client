import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import ProductDetail from '../../components/productDetail/product-detail';
import authGuard from '../../hoc/authGuard/auth-guard';
import OrderForm from '../../components/orderForm/order-form';
import classes from './create.module.css'
import ProductService from '../../services/product.service';
import { showModal } from '../../store/actions/modal';

const Create = (props) => {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const { match, history, openModal } = props;

  useEffect(() => {
    async function fetchProduct() {
      const productService = new ProductService();
      const productId = match.params["productId"];
      const data = await productService.get(productId);
      if (!data.error) {
        setProduct(data);
      } else {
        openModal(data.error);
      }
    }

    fetchProduct()
  }, [match, history, location, openModal]);

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

const mapDispatchToProps = dispatch => {
  return {
    openModal: (message) => dispatch(showModal(message))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(authGuard(Create, true)));
