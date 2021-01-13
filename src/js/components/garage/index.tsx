import React, { useState } from 'react';
import Tank from './tank';
import Weapons from './weapons';
import Statistics from './statistics';
import StartButton from './startButton';
import Points from './points';
import weaponStandart from '../../../assets/images/weapons/brown/standart/standart.png';
import PropertiesStandart from './interfacePropertyStandart';
import InfoBullet from './infoBullet';

const Garage: React.FC = () => {
  const ALL_POINTS = 200;
  const [properties, setProperties] = useState<PropertiesStandart>({
    path: weaponStandart,
    name: 'standart',
    options: {
      damage: 10,
      speedBullet: 2,
      speedGun: 5,
      range: 15,
      countBullets: 10,
    },
  });
  const [points, setPoints] = useState<number>(ALL_POINTS);
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
  const [count, setCount] = useState(1);
  const COST_BULLETS = properties.name === 'standart' ? 0 : count * 10;
  console.log('index cost bullets: ', COST_BULLETS);
  const funcTemplate1 = (
    str: string,
    num: number,
    options: {
      damage: number;
      speedGun: number;
      speedBullet: number;
      range: number;
      bulletPacs: number;
      cost: number;
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
          setCount={setCount}
          COST_BULLETS={COST_BULLETS}
          allPoints={ALL_POINTS}
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
          bulletPacs={count}
          cost={COST_BULLETS}
          countBullets={properties.options.countBullets}
        />
        <InfoBullet
          setPoints={setPoints}
          allPoints={ALL_POINTS}
          nameWeapon={properties.name}
          setCount={setCount}
          count={count}
          COST_BULLETS={COST_BULLETS}
        />
      </div>
    </section>
  );
};
export default Garage;
