import React from 'react';
import PixiApp from '../Proba';

const GameCanvas: React.FC = () => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const app = PixiApp;

  React.useEffect(() => {
    canvasRef.current.appendChild(app.view);
    return () => {
      app.stop();
    };
  });
  return (
    <div className="game-canvas">
      <div ref={canvasRef} />
    </div>
  );
};

export default GameCanvas;
