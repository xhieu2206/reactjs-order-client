import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './order-detail-screen.module.css';
import OrderService from '../../services/order.service';
import Button from '../../components/UI/Button/Button';
import { showModal } from '../../store/actions/modal';

const OrderDetailScreen = (props) => {
  const [order, setOrder] = useState({});
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const location = useLocation();
  const { match, token, openModal } = props;

  useEffect(() => {
    const orderService = new OrderService();
    async function fetchOrder() {
      const data = await orderService.get(match.params.id, token);
      if (!data.error) {
        setOrder(data);
      } else {
        openModal(data.error);
      }
    }

    fetchOrder();
  }, [location, match, token, openModal]);

  const onCancelOrderClickedHandler = async () => {
    const orderService = new OrderService();
    setIsProcessingOrder(true);
    const data = await orderService.cancelOrder(order, token)
    if (!data.error) {
      setTimeout(async () => {
        setIsProcessingOrder(false);
        const cancelOrder = await orderService.get(data.id, token);
        setOrder(cancelOrder);
      }, 2000);
    } else {
      openModal(data.error);
    }
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
                  <Button type="danger">Cancelled</Button>:
                  order.status === 'confirmed' ? <Button type="primary">Confirmed</Button> :
                    order.status === 'delivered' ? <Button type="success">Delivered</Button> :
                      <Button type="secondary">Pending</Button>
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
            {isProcessingOrder && !props.isModalDisplay ? <div className="d-flex align-items-center">
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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isModalDisplay: state.modal.isDisplay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: (message) => dispatch(showModal(message))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen));
