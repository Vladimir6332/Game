import React, { useState } from 'react';
import Menu from './Menu';

const App: React.FC = () => {
  const [isMenuActive, setMenuActive] = useState<boolean>(true);
  console.log(setMenuActive);
  return <div className="app">{isMenuActive ? <Menu /> : null}</div>;
};

export default App;
