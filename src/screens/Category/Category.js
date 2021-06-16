import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { withRouter, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { ENTRY_POINT } from '../../constants/URLs';
import Categories from '../../components/Categories/Categories';
import Products from '../../components/Products/Products';

const Category = props => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await axios.get(`${ENTRY_POINT}/categories`);
      setCategories(categories.data);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (props.match.path === "/categories") {
      axios.get(`${ENTRY_POINT}/products`)
        .then((res) => {
          setProducts(res.data);
        });
    } else if (props.match.path === "/categories/:categoryId") {
      const categoryId = props.match.params["categoryId"];
      axios.get(`${ENTRY_POINT}/categories/${categoryId}`)
        .then(res => {
          setProducts(res.data.products);
        });
    }
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
