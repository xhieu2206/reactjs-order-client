import { AUTH_START, AUTH_FAILED, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes';

const initState = {
  token: null,
  isLoggedIn: false,
  user: {
    email: '',
    username: ''
  },
  loading: false,
  error: ''
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: true,
        error: action.error
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
        loading: false,
        user: { ...action.user }
      };
    case AUTH_LOGOUT:
      return {
        ...initState
      }
    default:
      return state;
  }
}

export default reducer;
