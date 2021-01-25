import React from 'react';

interface Props {
  setPause(bol: boolean): void;
}
const Pause: React.FC<Props> = ({ setPause }: Props) => {
  const setPauseFalse = () => {
    setPause(false);
  };
  return (
    <div className="pause">
      <button
        type="button"
        className="button"
        onClick={setPauseFalse}
        onKeyUp={setPauseFalse}
      >
        Press for continue
      </button>
    </div>
  );
};

export default Pause;
