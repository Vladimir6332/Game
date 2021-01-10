import PropTypes from 'prop-types';
import React from 'react';

interface PropsType {
  callback(arr: Array<string>): void;
  path: string;
  name: string;
  points: number;
  setMinusPoints(num: number): void;
}
const Weapon: React.FC<PropsType> = (props) => {
  const { path, name, callback, setMinusPoints, points } = props;
  const click = (event: React.MouseEvent<HTMLImageElement>): void => {
    console.log(event.target);
    const { target } = event;

    const { classList } = target as Element;
    classList.add('choisedWeapon');
    callback([path, name]);
    setMinusPoints(points);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={click}
      onKeyPress={(): void => {
        console.log(name);
      }}
      className="garage__weapon"
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
};

export default Weapon;
