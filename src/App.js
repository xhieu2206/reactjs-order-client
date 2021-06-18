import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/layout/layout';
import Create from './screens/create/create';
import Category from './screens/category/category';
import OrderDetailScreen from './screens/orderDetailScreen/order-detail-screen';
import OrderList from './screens/orderList/order-list';
import Login from './screens/login/login';
import { loginSuccess } from './store/actions/auth';

const App = props => {
  let routes = (
    <Switch>
      <Route path="/categories/:categoryId" component={Category} exact={true} />
      <Route path="/categories" component={Category} />
      <Route path="/login" component={Login} />
      <Redirect to="/categories" />
    </Switch>
  );

  if (props.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/categories/:categoryId" component={Category} exact={true} />
        <Route path="/categories" component={Category} />
        <Route path="/products/:productId/order" component={Create} />
        <Route path="/orders/:id" component={OrderDetailScreen} />
        <Route path="/orders" component={OrderList} />
        <Redirect to="/categories" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryLogin: (token, user) => dispatch(loginSuccess(token, user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
