import React, { useState } from 'react';
import Tank from './tank';
import Weapons from './weapons';
import Statistics from './statistics';
import Points from './points';
import weaponStandart from '../../../assets/images/weapons/brown/standart/standart.png';

const Garage: React.FC = () => {
  const [properties, setProperties] = useState<Array<string>>([
    weaponStandart,
    'standart',
  ]);
  const [points, setPoints] = useState<number>(20);
  const statisticsProperties: {
    kills: number;
    deaths: number;
    lastTime: number;
    hitPercentage: number;
  } = {
    kills: 50,
    deaths: 14,
    lastTime: 0,
    hitPercentage: 15,
  };
  return (
    <section className="garage">
      <div className="garage__wrapper">
        <Points minusPoints={points} />
        <Tank properties={properties} />
        <Weapons setProperties={setProperties} setMinusPoints={setPoints} />
        <Statistics properties={statisticsProperties} />
      </div>
    </section>
  );
};
export default Garage;
