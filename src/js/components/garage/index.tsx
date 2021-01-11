import React, { useState } from 'react';
import Tank from './tank';
import Weapons from './weapons';
import Statistics from './statistics';
import StartButton from './startButton';
import Points from './points';
import weaponStandart from '../../../assets/images/weapons/brown/standart/standart.png';
import PropertiesStandart from './interfacePropertyStandart';

const Garage: React.FC = () => {
  const [properties, setProperties] = useState<PropertiesStandart>({
    path: weaponStandart,
    name: 'standart',
    options: {
      damage: 10,
      speedBullet: 2,
      speedGun: 5,
      range: 15,
    },
  });
  const [points, setPoints] = useState<number>(200);
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
  const funcTemplate1 = (
    str: string,
    num: number,
    options: {
      damage: number;
      speedGun: number;
      speedBullet: number;
      range: number;
    }
  ): void => {
    console.log(str, num, JSON.stringify(options));
  };

  return (
    <section className="garage">
      <div className="garage__wrapper">
        <Points allPoints={points} />
        <Tank name={properties.name} />
        <Weapons
          setProperties={setProperties}
          setMinusPoints={setPoints}
          allPoints={200}
        />
        <Statistics properties={statisticsPropertiesTemplate} />
        <StartButton
          callback={funcTemplate1}
          choisedWeapon={properties.name}
          restPoints={points}
          damage={properties.options.damage}
          speedBullet={properties.options.speedBullet}
          speedGun={properties.options.speedGun}
          range={properties.options.range}
        />
      </div>
    </section>
  );
};
export default Garage;
