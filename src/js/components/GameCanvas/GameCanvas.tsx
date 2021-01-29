import React from 'react';
import GameApp from '../Proba';

interface Props {
  startOptions: PlayOptions | null;
  isNewGame: boolean;
  setNewGame(isNewGame: boolean): void;
}

let game = new GameApp();
const GameCanvas: React.FC<Props> = ({
  startOptions,
  isNewGame,
  setNewGame,
}: Props) => {
  const canvasRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (isNewGame) {
      game.stop();
      game.pixi.stop();
      canvasRef.current.removeChild(game.pixi.view);
      game.pixi.stage.destroy({ children: true });
      console.log(game.pixi.stage);
      game = new GameApp();
      canvasRef.current.appendChild(game.pixi.view);
      game.start();
      setNewGame(false);
    }
  }, [isNewGame]);

  React.useEffect(() => {
    canvasRef.current.appendChild(game.pixi.view);
    game.init(startOptions);

    return () => {
      console.log('appINIT');
    };
  }, []);
  return (
    <div className="game-canvas">
      <div ref={canvasRef} />
    </div>
  );
};

export default GameCanvas;
