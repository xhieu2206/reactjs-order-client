import React, {useContext, useEffect, useState} from 'react';
import { withRouter, useLocation } from 'react-router';
import { connect } from 'react-redux';

import Categories from '../../components/categories/categories';
import Products from '../../components/products/products';
import CategoryService from '../../services/category.service';
import ProductService from '../../services/product.service';
import MessageContext from '../../context/message-context';

const Category = props => {
  const { open } = useContext(MessageContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchCategories() {
      const categoryService = new CategoryService()
      const data = await categoryService.getCategories();
      if (!data.error) {
        setCategories(data);
      } else {
        open(data.error);
      }
    }

    fetchCategories();
  }, [open]);

  useEffect(() => {
    async function fetchProducts() {
      const productService = new ProductService();
      let products;
      if (props.match.path === "/categories") {
        products = await productService.getAllProducts();
      } else if (props.match.path === "/categories/:categoryId") {
        const categoryId = props.match.params["categoryId"];
        products = await productService.getProductsByCategoryId(categoryId);
      }
      setProducts(products);
    }

    fetchProducts();
  }, [location, props.match])

  return (
    <div className="container">
      <div className="row">
        <Categories categories={categories} />
        <Products isLoggedIn={props.isLoggedIn} products={products} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(Category));
