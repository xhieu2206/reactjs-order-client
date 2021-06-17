import React from 'react';
import { connect } from 'react-redux';

import './modal.css';
import { hideModal } from '../../../store/actions/modal';

const Modal = props => {
  const classes = ['custom-modal', props.isDisplay ? 'custom-modal-show' : 'custom-modal-hide'].join(' ').trim();

  return (
    <div className={classes}>
      <div className="custom-modal-content">
        <span className="custom-modal-close" onClick={props.closeModal}>&times;</span>
        <p>{props.message}</p>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    isDisplay: state.modal.isDisplay,
    message: state.modal.message,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
