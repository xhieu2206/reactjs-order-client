import React, {useContext} from 'react';
import MessageContext from '../../../context/message-context';

import './modal.css';

const Modal = props => {
  const messageContext = useContext(MessageContext);
  const classes = ['custom-modal', props.show ? 'custom-modal-show' : 'custom-modal-hide'].join(' ').trim();

  return (
    <div className={classes}>
      <div className="custom-modal-content">
        <span className="custom-modal-close" onClick={() => messageContext.close()}>&times;</span>
        <p>{props.message}</p>
      </div>
    </div>
  )
};

export default Modal;
