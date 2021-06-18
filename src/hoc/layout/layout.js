import React, {useCallback, useState} from 'react';
import Header from '../../components/header/header';
import Modal from '../../components/UI/modal/modal';
import MessageContext from '../../context/message-context';

const Layout = props => {
  const [isDisplayMessage, setIsDisplayMessage] = useState(false);
  const [message, setMessage] = useState('');

  const displayMessage = message => {
    setIsDisplayMessage(true);
    setMessage(message);
  };

  const hideMessage = () => {
    setIsDisplayMessage(false);
  };

  return (
    <div className="container-fluid">
      <Header />
      <MessageContext.Provider value={{
        message: message,
        open: useCallback((message) => displayMessage(message), []),
        close: useCallback(() => hideMessage(), []),
      }}>
        <Modal show={isDisplayMessage} message={message} />
        <div className="container-fluid">
          {props.children}
        </div>
      </MessageContext.Provider>
    </div>
  )
};

export default Layout;
