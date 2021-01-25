import React, { useState } from 'react';
import GameCanvas from '../GameCanvas/GameCanvas';
import GameWeapons from '../GameWeapon/GameWeapons';
import GameLogs from '../GameLogs/GameLogs';
import GameMenu from '../GameMenu/GameMenu';
import Pause from '../Pause/Pause';

interface Props {
  startOptions: PlayOptions | null;
}

const Game: React.FC<Props> = ({ startOptions }: Props) => {
  const [isPause, setPause] = useState(false);
  const [isEsc, setEsc] = useState(false);
  const [isNewGame, setNewGame] = useState(false);
  console.log(isPause);
  console.log(isEsc);
  console.log(isNewGame);
  return (
    <section className="game">
      {isPause ? <Pause setPause={setPause} /> : ''}
      <div className="game__view">
        <GameCanvas />
      </div>
      <div className="game__control">
        <div className="game__weapon">
          <GameWeapons startOptions={startOptions} />
        </div>
        <div className="game__logs">
          <GameLogs />
        </div>
        <div className="game__menu">
          <GameMenu
            setPause={setPause}
            isPause={isPause}
            setEsc={setEsc}
            setNewGame={setNewGame}
          />
        </div>
      </div>
    </section>
  );
};

export default Game;
