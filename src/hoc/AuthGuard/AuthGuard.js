import React, { useEffect } from 'react';

const authGuard = (WrappedComponent, loggedInRequired) => {
  return (props) => {
    const { history, isLoggedIn } = props;

    useEffect(() => {
      if (!isLoggedIn && loggedInRequired) {
        history.push({
          pathname: '/login'
        });
      } else if (isLoggedIn && !loggedInRequired) {
        history.push({
          pathname: '/categories'
        });
      }
    }, [history, isLoggedIn]);

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  }
}

export default authGuard;
