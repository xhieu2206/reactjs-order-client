import React from 'react';

import classes from './input.module.css';

const Input = props => {
  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">{props.label}</label>
      <div className={[props.type === 'number' ? 'col-sm-2' : 'col-sm-10'].join(' ').trim()}>
        <input
          type={props.type}
          className={['form-control', props.isValidate ? '' : classes.NotValidate].join(' ').trim()}
          placeholder={props.placeholder}
          name={props.name}
          onChange={(e) => props.changed(e.target.value)}
          min={props.type === 'number' ? props.min : null}
          value={props.value}
        />
      </div>
      {
        props.type === 'email' ?
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> : null
      }
    </div>
  )
};

export default Input;
