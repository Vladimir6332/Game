import PropTypes from 'prop-types';
import React from 'react';
import PropertyStandart from '../interfacePropertyStandart';

interface PropsType {
  callback(obj: PropertyStandart): void;
  setMinusPoints(num: number): void;
  setCount(num: number): void;
  path: string;
  name: string;
  points: number;
  allPoints: number;
  choisedFirst: boolean;
  COST_BULLETS: number;
  countBullets: number;
  statistics: {
    [x: string]: number;
  };
}
const Weapon: React.FC<PropsType> = (props) => {
  const {
    path,
    name,
    callback,
    setMinusPoints,
    points,
    allPoints,
    choisedFirst,
    statistics,
    COST_BULLETS,
    countBullets,
    setCount,
  } = props;

  const clearAllClassName = () => {
    const weapons: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.garage__weapon'
    );

    weapons.forEach((item) => {
      item.classList.remove('choisedWeapon');
    });
  };
  const click = (event: React.MouseEvent<HTMLImageElement>): void => {
    const { target } = event;
    const { parentElement } = target as Element;
    const { classList } = parentElement;
    clearAllClassName();
    classList.add('choisedWeapon');
    if (name === 'standart') {
      setMinusPoints(allPoints);
      setCount(1);
    } else {
      setMinusPoints(allPoints - points - (COST_BULLETS || 10));
    }
    callback({
      path,
      name,
      options: {
        damage: statistics.damage,
        speedGun: statistics.speedGun,
        speedBullet: statistics.speedBullet,
        range: statistics.range,
        countBullets,
      },
    });
  };

  const statistic = `Урон: ${statistics.damage}, скорость снаряда: ${statistics.speedBullet}, скорость выстрелов: ${statistics.speedGun}  дальность: ${statistics.range}`;
  return (
    <div className="garage__weapon-wrapper">
      <p className="garage__weapon-text">{statistic}</p>
      <div
        role="presentation"
        onClick={click}
        className={`garage__weapon ${choisedFirst ? 'choisedWeapon' : ''}`}
      >
        <img src={path} alt="weapon" className="garage__weapon-img" />
      </div>
    </div>
  );
};

Weapon.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  setMinusPoints: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
  allPoints: PropTypes.number.isRequired,
  choisedFirst: PropTypes.bool.isRequired,
  statistics: PropTypes.objectOf(PropTypes.number).isRequired,
  COST_BULLETS: PropTypes.number.isRequired,
  countBullets: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
};

export default Weapon;
