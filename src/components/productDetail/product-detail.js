import React from 'react';
import classes from './product-detail.module.css';

const ProductDetail = (props) => (
  <div className={classes.ProductDetail}>
    <div className={classes.ProductImage}>
      <img src={props.product.image} alt="product" />
    </div>

    <div className={classes.ProductInformation}>
      <h3>{props.product.name}</h3>
      <p><strong>Description: </strong>{props.product.description}</p>
    </div>
  </div>
);

export default ProductDetail;
