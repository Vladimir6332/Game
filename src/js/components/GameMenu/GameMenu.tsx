import React from 'react';

interface Props {
  setNewGame(bol: boolean): void;
  setPause(bol: boolean): void;
  isPause: boolean;
  setEsc(bol: boolean): void;
}

const GameMenu: React.FC<Props> = ({
  setNewGame,
  setPause,
  isPause,
  setEsc,
}: Props) => {
  const clickPause = () => {
    setPause(!isPause);
  };
  const clickNewGame = () => {
    setNewGame(true);
  };
  const clickEsc = () => {
    setEsc(true);
  };

  return (
    <div className="game-menu">
      <button type="button" onClick={clickNewGame}>
        Start New Game
      </button>
      <button type="button" onClick={clickPause}>
        Pause
      </button>
      <button type="button" onClick={clickEsc}>
        Exit
      </button>
    </div>
  );
};

export default GameMenu;
