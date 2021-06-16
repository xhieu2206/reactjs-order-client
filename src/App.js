import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/layout/layout';
import Create from './screens/create/create';
import Category from './screens/category/category';
import OrderDetailScreen from './screens/orderDetailScreen/order-detail-screen';
import OrderList from './screens/orderList/order-list';
import Login from './screens/login/login';
import { loginSuccess } from './store/actions/auth';
import { getCookie } from './utils/cookieUtil';

const App = props => {
  const { onTryLogin } = props;

  useEffect(() => {
    const token = getCookie('token');
    const user = JSON.parse(getCookie('user'))
    if (token && user) {
      onTryLogin(token, user);
    }
  }, [onTryLogin]);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/categories/:categoryId" component={Category} exact={true} />
          <Route path="/categories" component={Category} />
          <Route path="/products/:productId/order" component={Create} />
          <Route path="/orders/:id" component={OrderDetailScreen} />
          <Route path="/orders" component={OrderList} />
          <Route path="/login" component={Login} />
          <Redirect to="/categories" />
        </Switch>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onTryLogin: (token, user) => dispatch(loginSuccess(token, user))
  }
}

export default connect(null, mapDispatchToProps)(App);
