import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import Login from './Login/Login';
import Garage from './garage';

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
  const [currentProfile, setCurrentProfile] = useState<ProfileOfUser | null>(
    null
  );

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route component={Menu} path="/" exact />

          <Route
            render={() => <Login onLogin={setCurrentProfile} />}
            path="/login"
          />
          <Route
            render={() => (
              <Garage
                statisticsPerson={currentProfile}
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
