import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tank from './tank';
import Weapons from './weapons';
import Statistics from './statistics';
import StartButton from './startButton';
import Points from './points';
import weaponStandart from '../../../assets/images/weapons/brown/standart/standart.png';
import PropertiesStandart from './interfacePropertyStandart';
import InfoBullet from './infoBullet';
import NoWindowPoints from './noPointsWindow';

interface PropertyIndex {
  statisticsPerson: {
    kills: number;
    deaths: number;
    lastVisit: Date;
    accuracy: number;
    nickName: string;
    timeInGame: number;
  };
  startTrigger(
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
  ): void;
  readonly ALL_POINTS: number;
}
const Garage: React.FC<PropertyIndex> = (props) => {
  const { statisticsPerson } = props;
  const { startTrigger } = props;
  const { ALL_POINTS } = props;
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
  const [count, setCount] = useState(1);
  const [switchNoPoints, setSwitchNoPoints] = useState(false);
  const COST_BULLETS = properties.name === 'standart' ? 0 : count * 10;
  const statistics = {
    kills: statisticsPerson.kills,
    deaths: statisticsPerson.deaths,
    lastVisit: statisticsPerson.lastVisit,
    accuracy: statisticsPerson.accuracy,
    timeInGame: statisticsPerson.timeInGame,
  };
  return (
    <section className="garage">
      {switchNoPoints ? <NoWindowPoints pointsNeed={points} /> : false}
      <div className="garage__wrapper">
        <Points allPoints={points} name={statisticsPerson.nickName} />
        <Tank name={properties.name} />
        <Weapons
          setProperties={setProperties}
          setMinusPoints={setPoints}
          setCount={setCount}
          COST_BULLETS={COST_BULLETS}
          allPoints={ALL_POINTS}
        />
        <Statistics properties={statistics} />
        <StartButton
          callback={startTrigger}
          choisedWeapon={properties.name}
          restPoints={points}
          damage={properties.options.damage}
          speedBullet={properties.options.speedBullet}
          speedGun={properties.options.speedGun}
          range={properties.options.range}
          bulletPacs={count}
          cost={COST_BULLETS}
          countBullets={properties.options.countBullets}
          setSwitchNoPoints={setSwitchNoPoints}
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

Garage.propTypes = {
  statisticsPerson: PropTypes.exact({
    kills: PropTypes.number.isRequired,
    deaths: PropTypes.number.isRequired,
    lastVisit: PropTypes.instanceOf(Date),
    accuracy: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired,
    timeInGame: PropTypes.number.isRequired,
  }).isRequired,
  startTrigger: PropTypes.func.isRequired,
  ALL_POINTS: PropTypes.number.isRequired,
};
export default Garage;
