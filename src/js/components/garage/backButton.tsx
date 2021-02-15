import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton: React.FC = () => {
  const history = useHistory();
  const back = (): void => {
    history.push('/');
  };
  return (
    <button type="button" className="garage__button" onClick={back}>
      Back
    </button>
  );
};

export default BackButton;
