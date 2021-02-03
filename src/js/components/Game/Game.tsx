import React, { useState, useEffect } from 'react';

import GameCanvas from '../GameCanvas/GameCanvas';
import GameWeapons from '../GameWeapon/GameWeapons';
import GameLogs from '../GameLogs/GameLogs';
import GameMenu from '../GameMenu/GameMenu';
import Pause from '../Pause/Pause';
import StatisticsService from '../../servise/StatisticsService';
import SoundService from '../../servise/SoundService';
import SoundControl from '../Menu/SoundControl';

const defaultVolume = +localStorage.getItem('gameVolume');

interface Props {
  startOptions: PlayOptions | null;
  userProfile: ProfileOfUser;
  profileUpdater: (profile: ProfileOfUser) => void;
}
const statService = new StatisticsService(null);
const soundService = new SoundService();

const Game: React.FC<Props> = ({
  startOptions,
  userProfile,
  profileUpdater,
}: Props) => {
  const [isPause, setPause] = useState(false);
  const [isEsc, setEsc] = useState(false);
  const [isNewGame, setNewGame] = useState(false);

  const [log, setLog] = useState({ typeMessage: 'null', message: 0 });

  const [volume, setVolume] = useState<number>(
    defaultVolume === 0 ? 0 : defaultVolume || 0
  );

  const handleVolume = (newVolume: number): void => {
    setVolume(newVolume);
    localStorage.setItem('gameVolume', newVolume.toString());
    soundService.setVolume(newVolume / 100);
  };

  useEffect(() => {
    if (soundService && soundService.audioList)
      soundService.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    statService.init(userProfile);
    soundService.init();
    return () => {
      const statistics = statService.destroy();
      const updatedProfile = { ...statistics };

      profileUpdater(updatedProfile);
    };
  }, []);

  useEffect(() => {
    if (isNewGame || isEsc) {
      setLog({ typeMessage: 'null', message: 0 });
    }
    if (isEsc) setEsc(false);
  }, [isNewGame, isEsc]);

  return (
    <section className="game">
      {isPause ? <Pause setPause={setPause} /> : ''}
      <div className="game__view">
        <GameCanvas
          userProfile={userProfile}
          startOptions={startOptions}
          isNewGame={isNewGame}
          isPause={isPause}
          isEsc={isEsc}
          setNewGame={setNewGame}
          setLog={setLog}
          statisticsService={statService}
          soundService={soundService}
        />
      </div>
      <div className="game__control">
        <div className="game__weapon">
          <GameWeapons startOptions={startOptions} />
        </div>
        <div className="game__logs">
          <GameLogs log={log} isNewGame={isNewGame} isEsc={isEsc} />
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
      <SoundControl onChange={handleVolume} defaultVolume={defaultVolume} />
    </section>
  );
};

export default Game;
