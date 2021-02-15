import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackButton from './backButton';

interface propsType {
  callback: (
    choisedWeapon: string,
    restPoints: number,
    options: {
      damage: number;
      speedGun: number;
      speedBullet: number;
      range: number;
      bulletPacs: number;
      cost: number;
      countBullets: number | string;
    }
  ) => void;
  choisedWeapon: string;
  restPoints: number;
  damage: number;
  speedGun: number;
  speedBullet: number;
  range: number;
  bulletPacs: number;
  countBullets: number | string;
  cost: number;
  setSwitchNoPoints: (noPoints: boolean) => void;
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
    bulletPacs,
    cost,
    countBullets,
    setSwitchNoPoints,
  } = props;

  const history = useHistory();

  const start = (): void => {
    if (restPoints >= 0) {
      callback(choisedWeapon, restPoints, {
        damage,
        speedGun,
        speedBullet,
        range,
        bulletPacs,
        cost,
        countBullets,
      });
      history.push('/play');
    } else {
      setSwitchNoPoints(true);
      setTimeout(() => {
        setSwitchNoPoints(false);
      }, 2500);
    }
  };
  return (
    <div className="garage__buttons">
      <BackButton />
      <button type="button" className="garage__button" onClick={start}>
        Start
      </button>
    </div>
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
  bulletPacs: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  countBullets: PropTypes.number.isRequired,
  setSwitchNoPoints: PropTypes.func.isRequired,
};

export default StartButton;
