import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import axios from 'axios';

import classes from './OrderDetailScreen.module.css';
import {ENTRY_POINT} from '../../constants/URLs';

const OrderDetailScreen = (props) => {
  const [order, setOrder] = useState({});
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const location = useLocation();
  const { match } = props;

  useEffect(() => {
    axios.get(`${ENTRY_POINT}/orders/${match.params.id}`)
      .then(res => {
        setOrder(res.data);
      })
  }, [location, match]);

  const onCancelOrderClickedHandler = () => {
    setIsProcessingOrder(true);
    axios.put(`${ENTRY_POINT}/orders/${match.params.id}`, {
      ...order,
      status: 'cancelled'
    })
      .then(({ data }) => {
        setTimeout(() => {
          setIsProcessingOrder(false);
          axios.get(`${ENTRY_POINT}/orders/${data.id}`)
            .then(({ data }) => {
              setOrder(data);
            })
        }, 2000)
      })
  }

  return (
    <div className="container">
      <div className="card mb-3 w-70">
        <div className="row g-0 p-3">
          <div className="col-md-4">
            <img style={{ width: '20em' }} src={order.image} alt="order" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-center">Order Detail</h5>
              <p className="card-text"><strong>Product Name: </strong>{order.productName}</p>
              <p className="card-text"><strong>Customer Name: </strong>{order.customerName}</p>
              <p className="card-text"><strong>Email: </strong>{order.email}</p>
              <p className="card-text"><strong>Phone: </strong>{order.phone}</p>
              <p className="card-text"><strong>Quantity: </strong>{order.quantity}</p>
              <p className="card-text"><strong>Delivery Address: </strong>{order.deliveryAddress}</p>
              {
                order.status !== 'cancelled' ? <p className="card-text"><strong>Pin: </strong> {order.pin}</p> : null
              }
              <p className="card-text">
                <strong>Order Status: </strong>
                { order.status === 'cancelled' ?
                  <button type="button" className="btn btn-danger">Cancelled</button> :
                  order.status === 'confirmed' ? <button type="button" className="btn btn-primary">Confirmed</button> :
                    order.status === 'delivered' ? <button type="button" className="btn btn-success">Delivered</button> :
                      <button type="button" className="btn btn-secondary">Pending</button>
                }
              </p>
              { order.status === 'confirmed' ?
                <p>Your order has been confirmed, if you want to cancel your order, click <span
                className={classes.Cancel} onClick={onCancelOrderClickedHandler}>HERE</span></p> :
                order.status === 'delivered' ?
                <p>Your order has been delivered, you cannot cancel your order</p> : order.status === 'cancelled' ?
                  <p className={classes.Cancel}>Your order has been declined by our payment system</p> : null
              }
            </div>
            {isProcessingOrder ? <div className="d-flex align-items-center">
              <strong>Your order is cancelling</strong>
              <div className="spinner-border ms-auto" role="status" aria-hidden="true">
              </div>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  )
};

export default withRouter(OrderDetailScreen);
