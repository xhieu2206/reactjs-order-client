import { MODAL_OPEN, MODAL_CLOSE } from '../actions/actionTypes'

const initState = {
  isDisplay: false,
  message: ''
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case MODAL_CLOSE:
      return {
        ...state,
        isDisplay: false,
        message: ''
      }
    case MODAL_OPEN:
      return {
        ...state,
        isDisplay: true,
        message: action.message
      }
    default:
      return state;
  }
}

export default reducer;
