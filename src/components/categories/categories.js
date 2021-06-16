import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './categories.module.css';

const Categories = (props) => (
  <div className="col-2">
    <ul className="list-group">
      {
        props.categories.map(category => <NavLink
          key={category.id}
          className="list-group-item"
          to={`/categories/${category.id}`}
          activeClassName={classes.ActiveCategory}
        >
          {category.name}
        </NavLink>)
      }
    </ul>
  </div>
);

export default Categories;
