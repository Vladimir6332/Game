import React from 'react';
import PropTypes from 'prop-types';

interface propsType {
  callback: (
    choisedWeapon: string,
    restPoints: number,
    options: {
      damage: number;
      speedGun: number;
      speedBullet: number;
      range: number;
    }
  ) => void;
  choisedWeapon: string;
  restPoints: number;
  damage: number;
  speedGun: number;
  speedBullet: number;
  range: number;
}
const StartButton: React.FC<propsType> = (props) => {
  const {
    callback,
    choisedWeapon,
    restPoints,
    damage,
    speedGun,
    speedBullet,
    range,
  } = props;

  const start = (): void => {
    if (restPoints >= 0) {
      callback(choisedWeapon, restPoints, {
        damage,
        speedGun,
        speedBullet,
        range,
      });
    } else {
      alert(
        `Stop! You need ${restPoints - restPoints - restPoints} for start game!`
      );
    }
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
  damage: PropTypes.number.isRequired,
  speedGun: PropTypes.number.isRequired,
  speedBullet: PropTypes.number.isRequired,
  range: PropTypes.number.isRequired,
};

export default StartButton;
