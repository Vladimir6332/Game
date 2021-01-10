import React from 'react';
import Garage from './garage';

const App: React.FC = () => {
  return (
    <div className="app">
      <Garage />
    </div>
  );
  // return <div className="app">{isMenuActive ? <Menu /> : null}</div>;
};

export default App;
