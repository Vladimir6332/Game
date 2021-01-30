import React from 'react';

const NotCorrect: React.FC<PropsNotCorrect> = ({ type }: PropsNotCorrect) => {
  const window = {
    login: (
      <div className="notCorrect">
        <span>Not correct login or password</span>
      </div>
    ),
    reset: (
      <div className="notCorrect">
        <span>Not correct login or password</span>
      </div>
    ),
    signUp: (
      <div className="notCorrect">
        <span>That nickname is busy</span>
      </div>
    ),
  };
  return window[type];
};

export default NotCorrect;
