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
      let data;
      if (props.match.path === "/categories") {
        data = await productService.getAllProducts();
      } else if (props.match.path === "/categories/:categoryId") {
        const categoryId = props.match.params["categoryId"];
        data = await productService.getProductsByCategoryId(categoryId);
      }
      if (!data.error) {
        setProducts(data);
      } else {
        open(data.error);
      }
    }

    fetchProducts();
  }, [location, props.match, open])

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
