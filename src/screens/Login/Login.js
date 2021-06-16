import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from '../../components/OrderForm/OrderForm.module.css';
import { login } from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import authGuard from '../../hoc/AuthGuard/AuthGuard';

const Login = (props) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [isDisplayCredential, setIsDisplayCredential] = useState(false);
  const { error } = props;
  const [validation, setValidation] = useState({
    username: {
      isValidate: true
    },
    password: {
      isValidate: true
    }
  });

  const submittedFormHandler = async (e) => {
    e.preventDefault()
    const updateValidate = { ...validation };
    updateValidate.username.isValidate = username.length > 3;
    updateValidate.password.isValidate = password.length > 6;
    setValidation(updateValidate);
    if (validation.username.isValidate && validation.password.isValidate) {
      await props.onLogin(username, password);
    }
  }

  return (
    <div className="container">
      <div className="mb-3 row">
        <div className="col">
          <button
            type="button"
            onClick={() => setIsDisplayCredential(!isDisplayCredential)}
            className="btn btn-danger">click here to show pre-defined credential
          </button>
        </div>
      </div>

      { isDisplayCredential ?
        <div className="mb-3 row">
          <div className="col">
            <p>admin / password</p>
            <p>customer / password</p>
            <p>member / password</p>
          </div>
        </div> : null
      }

      { error === 'Unauthorized' ?
        <div className="alert alert-danger" role="alert">
          Username or password is incorrect
        </div> : null
      }
      <form>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input
              type="text"
              className={['form-control', validation.username.isValidate ? '' : classes.NotValidate].join(' ').trim()}
              placeholder="Username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              type="password"
              className={['form-control', validation.password.isValidate ? '' : classes.NotValidate].join(' ').trim()}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-5">
          </div>
          <div className="col-2">
            <button onClick={event => submittedFormHandler(event)} type="button" className="btn btn-primary w-100">Login</button>
          </div>
          <div className="col-5">
          </div>
        </div>
      </form>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(login(email, password))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(authGuard(Login, false)));
