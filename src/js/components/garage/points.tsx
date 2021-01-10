import React from 'react';
import PropTypes from 'prop-types';

interface propsType {
  minusPoints: number;
  allPoints: number;
}
const Points: React.FC<propsType> = (props) => {
  const { minusPoints, allPoints } = props;

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
  allPoints: PropTypes.number.isRequired,
};

export default Points;
