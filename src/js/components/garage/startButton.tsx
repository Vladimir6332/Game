import React from 'react';
import PropTypes from 'prop-types';

interface propsType {
  callback: (choisedWeapon: string, restPoints: number) => void;
  choisedWeapon: string;
  restPoints: number;
}
const StartButton: React.FC<propsType> = (props) => {
  const { callback, choisedWeapon, restPoints } = props;

  const start = (): void => {
    callback(choisedWeapon, restPoints);
  };
  return (
    <button type="button" className="garage__button" onClick={start}>
      Start
    </button>
  );
};

StartButton.propTypes = {
  callback: PropTypes.func.isRequired,
  choisedWeapon: PropTypes.string.isRequired,
  restPoints: PropTypes.number.isRequired,
};

export default StartButton;
