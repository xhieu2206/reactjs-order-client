import React, { useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Create from './screens/Create/Create';
import Category from './screens/Category/Category';
import OrderDetailScreen from './screens/OrderDetailScreen/OrderDetailScreen';
import OrderList from './screens/OrderList/OrderList';
import Login from './screens/Login/Login';
import { loginSuccess } from './store/actions/auth';

const App = props => {
  const { onTryLogin } = props;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
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
