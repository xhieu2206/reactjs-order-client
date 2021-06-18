import React, { useState } from 'react';
import { connect } from 'react-redux';

import { login } from '../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/Button/Button';

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
          <Button
            type="danger"
            clicked={() => setIsDisplayCredential(!isDisplayCredential)}
            fullWidth={false}
          >
            click here to show pre-defined credential
          </Button>
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

      {
        error === 'Unauthorized' ?
          <div className="alert alert-danger" role="alert">
            Username or password is incorrect
          </div> : null
      }

      <form>
        <Input
          label="Username"
          type="text"
          isValidate={validation.username.isValidate}
          value={username}
          placeholder="Username"
          changed={(value) => setUsername(value)}
        />

        <Input
          label="Password"
          type="password"
          isValidate={validation.password.isValidate}
          value={password}
          placeholder="Password"
          changed={value => setPassword(value)}
        />

        <div className="mb-3 row">
          <div className="col-5">
          </div>
          <div className="col-2">
            <Button fullWidth={true} type="primary" clicked={event => submittedFormHandler(event)}>Login</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
