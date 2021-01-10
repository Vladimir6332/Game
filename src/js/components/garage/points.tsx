import React from 'react';
import PropTypes from 'prop-types';

interface propsType {
  minusPoints: number;
}
const Points: React.FC<propsType> = (props) => {
  const { minusPoints } = props;
  const allPoints = 100;

  return (
    <div className="garage__points-wrapper">
      <div className="garage__points">
        {`Points ${allPoints - minusPoints}`}
      </div>
    </div>
  );
};

Points.propTypes = {
  minusPoints: PropTypes.number.isRequired,
};

export default Points;
