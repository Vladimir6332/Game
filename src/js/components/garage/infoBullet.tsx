import React from 'react';
import PropTypes from 'prop-types';
import { weapons, objWeapon } from './weapons/weapons';

interface PropertiesBullet {
  setPoints(num: number): void;
  setCount(num: number): void;
  allPoints: number;
  nameWeapon: string;
  count: number;
  COST_BULLETS: number;
}
const InfoBullet: React.FC<PropertiesBullet> = (props) => {
  const {
    setPoints,
    allPoints,
    nameWeapon,
    setCount,
    count,
    COST_BULLETS,
  } = props;

  const currentWeapon: objWeapon = weapons.find((item) => {
    if (item.name === nameWeapon) {
      return true;
    }
    return false;
  });
  const { countBullets } = currentWeapon.statistics;
  const { name } = currentWeapon;
  const { points } = currentWeapon;

  const plus = (): void => {
    if (nameWeapon !== 'standart') {
      setCount(count + 1);
      setPoints(allPoints - (COST_BULLETS + 10 + points));
    }
  };
  const minus = (): void => {
    if (count > 1 && nameWeapon !== 'standart') {
      setCount(count - 1);
      setPoints(allPoints - (COST_BULLETS + points - 10));
    }
  };
  return (
    <>
      <div className="garage__bullet-info">
        <h2 className="garage__bullet-info-title">Bullet cost</h2>
        <span className="garage__bullet-info-subtitle">
          {`Cost: ${name === 'standart' ? 0 : 10}, amount:${
            name === 'standart' ? 0 : countBullets
          }`}
        </span>
      </div>
      <div className="garage__bullet-change">
        <span>Bullet packs</span>
        <div className="garage__bullet-buttons">
          <button type="button" onClick={minus}>
            -
          </button>
          <span>{count}</span>
          <button type="button" onClick={plus}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

InfoBullet.propTypes = {
  setPoints: PropTypes.func.isRequired,
  allPoints: PropTypes.number.isRequired,
  nameWeapon: PropTypes.string.isRequired,
  setCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  COST_BULLETS: PropTypes.number.isRequired,
};
export default InfoBullet;
