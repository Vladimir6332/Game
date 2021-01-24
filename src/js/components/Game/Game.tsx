import React from 'react';
import GameCanvas from '../GameCanvas/GameCanvas';
import GameWeapons from '../GameWeapon/GameWeapons';
import GameLogs from '../GameLogs/GameLogs';
import GameMenu from '../GameMenu/GameMenu';

interface Props {
  startOptions: PlayOptions | null;
}

const Game: React.FC<Props> = ({ startOptions }: Props) => {
  return (
    <section className="game">
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
          <GameMenu />
        </div>
      </div>
    </section>
  );
};

export default Game;
