import React from 'react';

const Button = props => {
  const classes = ['btn', `btn-${props.type}`, props.fullWidth ? 'w-100' : ''].join(' ').trim();

  return (
    <button
      type="button"
      onClick={(event) => props.clicked(event)}
      className={classes}>{props.children}
    </button>
  )
};

export default Button;
