import PropTypes from 'prop-types';
import React from 'react';

interface PropsType {
  callback(arr: Array<string>): void;
  setMinusPoints(num: number): void;
  path: string;
  name: string;
  points: number;
  allPoints: number;
  choisedFirst: boolean;
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
    setMinusPoints(allPoints - points);
    callback([path, name]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={click}
      onKeyPress={(): void => {
        console.log(name);
      }}
      className={`garage__weapon ${choisedFirst ? 'choisedWeapon' : ''}`}
    >
      <img src={path} alt="weapon" className="garage__weapon-img" />
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
};

export default Weapon;
