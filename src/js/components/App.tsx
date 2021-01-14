import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import Login from './Login';
import Garage from './garage';
import saveStatistics from '../servise/saveStatistics';

if (!localStorage.getItem('_statistics')) {
  saveStatistics(0, 0, new Date().toLocaleString(), 10, 0);
}

const App: React.FC = () => {
  const [isMenuActive, setMenuActive] = useState<boolean>(true);
  console.log(isMenuActive, setMenuActive);
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route component={Menu} path="/" exact />
          <Route component={Login} path="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
