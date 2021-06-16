import React from 'react';
import {Link} from 'react-router-dom';

import classes from './products.module.css';

const Products = props => {
  return (
    <div className="col-10">
      <div className={classes.ProductsContainer}>
      {
        props.products.map(product => <div className={classes.Product} key={product.id}>
            <div className="card pt-2">
              <img src={product.image} className="card-img-top" alt="product" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                {
                  props.isLoggedIn ?
                    <Link to={`/products/${product.id}/order`} className="btn btn-primary">Order this product</Link>
                    : <Link to="/login" className="btn btn-danger">Login to order</Link>
                }
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default Products;
