import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import { loginStart, loginSuccess, loginFailed } from '../actions/auth';
import { ENTRY_POINT } from '../../constants/URLs';

function* loginUser(action) {
  yield put(loginStart());
  try {
    const res = yield axios.post(`${ENTRY_POINT}/login`, {
      username: action.username,
      password: action.password
    });
    localStorage.setItem('token', res.data.access_token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    yield put(loginSuccess(res.data.access_token, res.data.user));
  } catch(e) {
    yield put(loginFailed(e.response.data.message));
  }
}

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, loginUser);
}
