import { MODAL_OPEN, MODAL_CLOSE } from './actionTypes';

export const showModal = (message) => {
  return {
    type: MODAL_OPEN,
    message
  }
}

export const hideModal = () => {
  return {
    type: MODAL_CLOSE
  }
}
