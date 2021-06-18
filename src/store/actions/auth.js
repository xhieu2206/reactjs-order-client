import * as actionTypes from './actionTypes';
import Cookies from 'js-cookie';

export const login = (username, password) => {
  return {
    type: actionTypes.AUTH_USER,
    username, password
  }
}

export const loginStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const loginSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: {...user}
  }
}

export const loginFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  }
}

export const logout = () => {
  Cookies.remove('token', { path: '' });
  Cookies.remove('user', { path: '' });
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
