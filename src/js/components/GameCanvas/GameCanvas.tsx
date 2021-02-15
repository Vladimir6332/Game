import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Statistics } from '../../custom_typings/Tanks.d';
import GameApp from '../Proba';
import Rotate from '../Login/Rotate';

interface LogMessage {
  typeMessage: string;
  message: number;
}
interface Props {
  userProfile: ProfileOfUser;
  startOptions: PlayOptions | null;
  isNewGame: boolean;
  isPause: boolean;
  isEsc: boolean;
  setNewGame(isNewGame: boolean): void;
  setLog(message: LogMessage): void;
  statisticsService: Statistics;
  soundService: SoundServiceInterface;
}

let game: GameApp;
const GameCanvas: React.FC<Props> = ({
  userProfile,
  startOptions,
  isNewGame,
  isPause,
  isEsc,
  setNewGame,
  setLog,
  statisticsService,
  soundService,
}: Props) => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const history = useHistory();
  const gameConfig = {
    setLog,
    startOptions,
    statisticsService,
    soundService,
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadingHandler = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    game = new GameApp(gameConfig, loadingHandler);
    canvasRef.current.appendChild(game.pixi.view);
    game.init(startOptions);
  }, []);

  useEffect(() => {
    if (isNewGame) {
      game.stop();
      game.pixi.stop();
      canvasRef.current.removeChild(game.pixi.view);
      game.pixi.stage.destroy({ children: true });
      game = new GameApp(gameConfig, loadingHandler);
      canvasRef.current.appendChild(game.pixi.view);
      game.start();
      setNewGame(false);
    }
  }, [isNewGame]);

  useEffect(() => {
    if (isPause) {
      game.pause();
      game.pixi.stop();
    } else if (game?.tank) {
      game.continue();
      game.pixi.start();
    }
  }, [isPause]);

  useEffect(() => {
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
      {isLoading ? <Rotate /> : null}
      <div ref={canvasRef} />
    </div>
  );
};

export default GameCanvas;
