import React from 'react';

const MessageContext = React.createContext({
  msg: '',
  open: () => {},
  close: () => {}
});

export default MessageContext;
