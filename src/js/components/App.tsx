import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import Login from './Login/Login';
import Garage from './garage';
import Game from './Game/Game';

const ALL_POINTS = 100;

const App: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState<ProfileOfUser | null>(
    null
  );
  const [playOptions, setPlayOptions] = useState<PlayOptions | null>(null);
  const start: PlayOptionsCallback = (str, num, options) => {
    setPlayOptions({ str, num, options });
  };

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
                startTrigger={start}
                ALL_POINTS={ALL_POINTS}
              />
            )}
            path="/garage"
          />
          <Route
            render={() => <Game startOptions={playOptions} />}
            path="/play"
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
