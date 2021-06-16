import * as actionTypes from './actionTypes';

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
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
