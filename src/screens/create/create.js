import React, {useContext, useEffect, useState} from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './create.module.css'
import ProductDetail from '../../components/productDetail/product-detail';
import MessageContext from '../../context/message-context';
import OrderForm from '../../components/orderForm/order-form';
import ProductService from '../../services/product.service';

const Create = (props) => {
  const [product, setProduct] = useState({});
  const { open } = useContext(MessageContext);
  const location = useLocation();
  const { match, history } = props;

  useEffect(() => {
    async function fetchProduct() {
      const productService = new ProductService();
      const productId = match.params["productId"];
      const data = await productService.get(productId);
      if (!data.error) {
        setProduct(data);
      } else {
        open(data.error);
      }
    }

    fetchProduct()
  }, [match, history, location, open]);

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

export default withRouter(connect(mapStateToProps, null)(Create));
