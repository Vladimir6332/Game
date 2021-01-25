import React from 'react';

interface Props {
  setNewGame(bol: boolean): void;
  setPause(bol: boolean): void;
  setEsc(bol: boolean): void;
}

const GameMenu: React.FC<Props> = ({ setNewGame, setPause, setEsc }: Props) => {
  const isPause = false;

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
      <button type="button" onClick={clickPause}>
        Start NewGame Game
      </button>
    </div>
  );
};

export default GameMenu;
