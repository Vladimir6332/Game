import React from 'react';
import PropTypes from 'prop-types';
import Weapon from './weapon';
import { weapons, objWeapon } from './weapons';

interface PropsType {
  setProperties(arr: Array<string>): void;
  setMinusPoints(num: number): void;
}

const Weapons: React.FC<PropsType> = (props) => {
  const { setProperties, setMinusPoints } = props;
  const list: Array<JSX.Element> = weapons.map((item: objWeapon) => {
    return (
      <Weapon
        key={item.id}
        callback={setProperties}
        path={item.path}
        name={item.name}
        points={item.points}
        setMinusPoints={setMinusPoints}
      />
    );
  });

  return <div className="garage__weapon-list">{list}</div>;
};

Weapons.propTypes = {
  setProperties: PropTypes.func.isRequired,
  setMinusPoints: PropTypes.func.isRequired,
};
export default Weapons;
