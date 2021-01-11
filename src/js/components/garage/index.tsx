import React, { useState } from 'react';
import Tank from './tank';
import Weapons from './weapons';
import Statistics from './statistics';
import StartButton from './startButton';
import Points from './points';
import weaponStandart from '../../../assets/images/weapons/brown/standart/standart.png';

const Garage: React.FC = () => {
  const [properties, setProperties] = useState<Array<string>>([
    weaponStandart,
    'standart',
  ]);
  const [points, setPoints] = useState<number>(50);
  const statisticsPropertiesTemplate: {
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
  const funcTemplate1 = (str: string, num: number): void => {
    console.log(str, num);
  };

  return (
    <section className="garage">
      <div className="garage__wrapper">
        <Points allPoints={points} />
        <Tank properties={properties} />
        <Weapons
          setProperties={setProperties}
          setMinusPoints={setPoints}
          allPoints={50}
        />
        <Statistics properties={statisticsPropertiesTemplate} />
        <StartButton
          callback={funcTemplate1}
          choisedWeapon={properties[1]}
          restPoints={points}
        />
      </div>
    </section>
  );
};
export default Garage;
