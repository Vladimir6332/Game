import React from 'react';
import wheel from '../../../assets/cogwheel.svg';

const RotateWheel: React.FC = () => {
  return (
    <div className="spinWheel">
      <div className="spinWheel__img-wrap">
        <img src={wheel} alt="loading" className="loading" />
      </div>
    </div>
  );
};

export default RotateWheel;
