import React from 'react';
import { app, start, loadAssets } from '../Proba';

interface Props {
  startOptions: PlayOptions | null;
}

let isAssetsLoaded = false;

const GameCanvas: React.FC<Props> = ({ startOptions }: Props) => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const PIXIapp = app;

  React.useEffect(() => {
    canvasRef.current.appendChild(PIXIapp.view);
    console.log(app.stage);
    if (isAssetsLoaded) {
      // PIXIapp.stage.destroy({ children: true });
      start();
    }
  });

  React.useEffect(() => {
    canvasRef.current.appendChild(PIXIapp.view);
    loadAssets(start);
    isAssetsLoaded = true;
    return () => {
      console.log('appSTOP');
    };
  }, []);
  return (
    <div className="game-canvas">
      <div ref={canvasRef} />
    </div>
  );
};

export default GameCanvas;
