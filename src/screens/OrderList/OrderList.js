import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { ENTRY_POINT } from '../../constants/URLs';
import classes from './OrderList.module.css';
import { Link } from 'react-router-dom';
import authGuard from '../../hoc/AuthGuard/AuthGuard';
import {connect} from 'react-redux';

const OrderList = props => {
  const [orders, setOrders] = useState([]);
  const { token } = props;

  useEffect(() => {
    axios.get(`${ENTRY_POINT}/orders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(({data}) => {
        setOrders(data);
      })
  }, [token]);

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Delivery Address</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">

            </th>
          </tr>
        </thead>

        <tbody>
          {
            orders.map(order => <tr key={order.id}>
              <th scope="row">{`ORDER-${order.id}`}</th>
              <td>{order.customerName}</td>
              <td>{order.quantity}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.phone}</td>
              <td>{order.email}</td>
              <td
                className={
                  [classes.StatusText,
                    order.status === 'confirmed' ? classes.ConfirmedStatus :
                      order.status === 'cancelled' ? classes.CancelledStatus :
                        order.status === 'delivered' ? classes.DeliveredStatus :
                          classes.PendingStatus
                  ].join(' ').trim()}
              >
                {order.status}
              </td>
              <td>
                <Link to={`/orders/${order.id}`} type="button" className="btn btn-primary">Detail</Link>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, null)(authGuard(OrderList, true));
