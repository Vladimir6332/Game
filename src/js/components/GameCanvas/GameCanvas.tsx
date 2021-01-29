import React from 'react';
import { useHistory } from 'react-router-dom';
import GameApp from '../Proba';

interface Props {
  startOptions: PlayOptions | null;
  isNewGame: boolean;
  isPause: boolean;
  isEsc: boolean;
  setNewGame(isNewGame: boolean): void;
}

let game: GameApp;
const GameCanvas: React.FC<Props> = ({
  startOptions,
  isNewGame,
  isPause,
  isEsc,
  setNewGame,
}: Props) => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const history = useHistory();

  React.useEffect(() => {
    console.log('1');
    game = new GameApp();
    canvasRef.current.appendChild(game.pixi.view);
    game.init(startOptions);

    return () => {
      console.log('appINIT');
    };
  }, []);

  React.useEffect(() => {
    console.log('2');
    if (isNewGame) {
      game.stop();
      game.pixi.stop();
      canvasRef.current.removeChild(game.pixi.view);
      game.pixi.stage.destroy({ children: true });
      game = new GameApp();
      canvasRef.current.appendChild(game.pixi.view);
      game.start();
      setNewGame(false);
    }
  }, [isNewGame]);

  React.useEffect(() => {
    console.log('PAUSE');
    if (isPause) {
      game.pause();
      game.pixi.stop();
    } else if (game?.tank) {
      game.continue();
      game.pixi.start();
    }
  }, [isPause]);

  React.useEffect(() => {
    if (isEsc) {
      game.stop();
      game.pixi.stop();
      canvasRef.current.removeChild(game.pixi.view);
      game.pixi.destroy();
      history.push('/garage');
    }
  }, [isEsc]);

  return (
    <div className="game-canvas">
      <div ref={canvasRef} />
    </div>
  );
};

export default GameCanvas;
