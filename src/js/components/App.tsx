import React from 'react';

interface fn {
  str: string;
  arr: number[];
}
const App: React.FC = () => {
  const d: fn = {
    str: 'ddddddcsdd',
    arr: [1, 2],
  };
  return <div className="app">{d.str}</div>;
};

export default App;
