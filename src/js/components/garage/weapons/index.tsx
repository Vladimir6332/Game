import React from 'react';
import PropTypes from 'prop-types';
import Weapon from './weapon';
import { weapons, objWeapon } from './weapons';
import PropertyStandart from '../interfacePropertyStandart';

interface PropsType {
  setProperties(obj: PropertyStandart): void;
  setMinusPoints(num: number): void;
  allPoints: number;
}

const Weapons: React.FC<PropsType> = (props) => {
  const { setProperties, setMinusPoints, allPoints } = props;
  const list: Array<JSX.Element> = weapons.map((item: objWeapon) => {
    return (
      <Weapon
        key={item.id}
        callback={setProperties}
        path={item.path}
        name={item.name}
        points={item.points}
        setMinusPoints={setMinusPoints}
        allPoints={allPoints}
        choisedFirst={item.choised}
        statistics={item.statistics}
      />
    );
  });

  return <div className="garage__weapon-list">{list}</div>;
};

Weapons.propTypes = {
  setProperties: PropTypes.func.isRequired,
  setMinusPoints: PropTypes.func.isRequired,
  allPoints: PropTypes.number.isRequired,
};
export default Weapons;
