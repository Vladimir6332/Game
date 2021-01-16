import React from 'react';
import PixiApp from './Proba';

const App = () => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const app = PixiApp;

  React.useEffect(() => {
    canvasRef.current.appendChild(app.view);
    return () => {
      app.stop();
    };
  });

  return (
    <div className="App">
      <div ref={canvasRef} />
    </div>
  );
};

export default App;
