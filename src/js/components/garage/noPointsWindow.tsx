import React from 'react';

interface PropsWindow {
  pointsNeed: number;
}

const noPointsWindow: React.FC<PropsWindow> = (props) => {
  const { pointsNeed } = props;
  return (
    <div className="noPoints">
      <span>{`You need ${pointsNeed - pointsNeed * 2} points for start!`}</span>
    </div>
  );
};

export default noPointsWindow;
