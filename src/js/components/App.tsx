import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import Login from './Login/Login';
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
  const [isMenuActive, setMenuActive] = useState<boolean>(true);
  console.log(isMenuActive, setMenuActive);
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route component={Menu} path="/" exact />
          <Route component={Login} path="/login" />
          <Route
            render={() => (
              <Garage
                statisticsPerson={statisticsPropertiesTemplate}
                startTrigger={funcTemplate1}
                ALL_POINTS={ALL_POINTS}
              />
            )}
            path="/garage"
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
