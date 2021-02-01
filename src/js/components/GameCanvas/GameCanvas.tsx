import React from 'react';
import { useHistory } from 'react-router-dom';
import { Statistics } from '../../custom_typings/Tanks.d';
import GameApp from '../Proba';

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
}: Props) => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const history = useHistory();
  const gameConfig = {
    setLog,
    startOptions,
    statisticsService,
  };

  React.useEffect(() => {
    console.log('1');
    game = new GameApp(gameConfig);
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
      game = new GameApp(gameConfig);
      canvasRef.current.appendChild(game.pixi.view);
      game.start();
      setNewGame(false);
    }
  }, [isNewGame]);

  React.useEffect(() => {
    console.log('PAUSE');
    console.log(gameConfig.statisticsService.statistics);
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
