import React from 'react';
import Garage from './garage';
import saveStatistics from '../servise/saveStatistics';

if (!localStorage.getItem('_statistics')) {
  saveStatistics(0, 0, new Date().toLocaleString(), 10, 0);
}
const statisticsPropertiesTemplate: {
  kills: number;
  deaths: number;
  lastTime: string;
  hitPercentage: number;
} = {
  kills: 50,
  deaths: 14,
  lastTime: new Date().toLocaleString(),
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
    bulletPacs: number;
    cost: number;
  }
): void => {
  console.log(str, num, JSON.stringify(options));
};
const ALL_POINTS = 30;
const App: React.FC = () => {
  return (
    <div className="app">
      <Garage
        statisticsPerson={statisticsPropertiesTemplate}
        startTrigger={funcTemplate1}
        ALL_POINTS={ALL_POINTS}
      />
    </div>
  );
  // return <div className="app">{isMenuActive ? <Menu /> : null}</div>;
};

export default App;
