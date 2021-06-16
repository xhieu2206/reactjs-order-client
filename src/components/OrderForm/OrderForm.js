import React, { useState } from 'react';
import classes from './OrderForm.module.css';
import axios from 'axios';
import { connect } from 'react-redux';

import { ENTRY_POINT } from '../../constants/URLs';
import { withRouter } from 'react-router-dom';

const OrderForm = (props) => {
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

  const submittedFormHandler = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    const updateValidate = {...validation};
    updateValidate.email.isValidate = emailRegex.test(email);
    updateValidate.name.isValidate = name.length >= 3;
    updateValidate.phone.isValidate = phoneRegex.test(phone)
    updateValidate.address.isValidate = address.length >= 5;
    setValidation(updateValidate)
    if (validation.email.isValidate && validation.name.isValidate && validation.address.isValidate && validation.phone.isValidate) {
      axios.post(`${ENTRY_POINT}/orders`, {
        productName: props.product.name,
        image: props.product.image,
        quantity,
        deliveryAddress: address,
        customerName: name,
        phone,
        email
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => {
          console.log('Create new order successfully');
          setIsProcessingOrder(true);
          setTimeout(() => {
            setIsProcessingOrder(false);
            props.history.push(`/orders/${res.data.id}`);
          }, 4000);
        })
        .catch(() => console.log('Error while creating new order'));
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
      <div className="mb-3 row">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email address</label>
        <div className="col-sm-10">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            type="email"
            className={['form-control', validation.email.isValidate ? '' : classes.NotValidate].join(' ').trim()}
            id="inputEmail"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
        <div className="col-sm-10">
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Your Name" type="text"
            className={['form-control', validation.name.isValidate ? '' : classes.NotValidate].join(' ').trim()}
            id="inputName"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone Number</label>
        <div className="col-sm-10">
          <input
            value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone Number" type="text"
            className={['form-control', validation.phone.isValidate ? '' : classes.NotValidate].join(' ').trim()}
            id="inputPhone" />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Delivery Address</label>
        <div className="col-sm-10">
          <input
            value={address} onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address" type="text"
            className={['form-control', validation.address.isValidate ? '' : classes.NotValidate].join(' ').trim()}
            id="inputAddress" />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputQuantity" className="col-sm-2 col-form-label">Quantity</label>
        <div className="col-sm-2">
          <input
            value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}
            type="number" className="form-control" id="inputQuantity" min="1" />
        </div>
      </div>

      <div className="col-sm-12 text-end">
        <button onClick={submittedFormHandler} type="submit" className="btn btn-primary">Submit</button>
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
