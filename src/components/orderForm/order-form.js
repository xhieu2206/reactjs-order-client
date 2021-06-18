import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './order-form.module.css';
import OrderService from '../../services/order.service';
import Input from '../UI/input/input';
import Button from '../UI/Button/Button';
import MessageContext from '../../context/message-context';

const OrderForm = (props) => {
  const { open } = useContext(MessageContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const { token } = props;
  const [validation, setValidation] = useState({
    email: {
      isValidate: true
    },
    name: {
      isValidate: true
    },
    phone: {
      isValidate: true
    },
    address: {
      isValidate: true
    }
  })

  const submittedFormHandler = async () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    const updateValidate = {...validation};
    updateValidate.email.isValidate = emailRegex.test(email);
    updateValidate.name.isValidate = name.length >= 3;
    updateValidate.phone.isValidate = phoneRegex.test(phone)
    updateValidate.address.isValidate = address.length >= 5;
    setValidation(updateValidate);
    const orderService = new OrderService();
    if (validation.email.isValidate && validation.name.isValidate && validation.address.isValidate && validation.phone.isValidate) {
      const res = await orderService.createOrder({
        productName: props.product.name,
        image: props.product.image,
        quantity,
        deliveryAddress: address,
        customerName: name,
        phone,
        email
      }, token);
      if (!res.error) {
        setIsProcessingOrder(true);
        setTimeout(() => {
          setIsProcessingOrder(false);
          props.history.push(`/orders/${res.id}`);
        }, 4000);
      } else {
        open(res.error);
      }
    }
  }

  return (
    <div className={classes.OrderForm}>
      {isProcessingOrder ? <div className="d-flex align-items-center">
        <strong>Order is processing</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true">
        </div>
      </div> : null}
      <h3 className={classes.Title}>Create a new Order</h3>

      <Input
        label="Your Email"
        type="email"
        isValidate={validation.email.isValidate}
        value={email}
        placeholder="Email"
        changed={value => setEmail(value)}
      />

      <Input
        label="Your Name"
        type="text"
        isValidate={validation.name.isValidate}
        value={name}
        placeholder="Your Name"
        changed={value => setName(value)}
      />

      <Input
        label="Phone Number"
        type="text"
        isValidate={validation.phone.isValidate}
        value={phone}
        placeholder="Your Phone Number"
        changed={value => setPhone(value)}
      />

      <Input
        label="Delivery Address"
        type="text"
        isValidate={validation.address.isValidate}
        value={address}
        placeholder="Your Address"
        changed={value => setAddress(value)}
      />

      <Input
        label="Quantity"
        type="number"
        isValidate={true}
        value={quantity}
        changed={value => setQuantity(value)}
        min="1"
      />

      <div className="col-sm-12 text-end">
        <Button clicked={submittedFormHandler} type="primary" fullWidth={false}>Submit</Button>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default withRouter(connect(mapStateToProps, null)(OrderForm));
