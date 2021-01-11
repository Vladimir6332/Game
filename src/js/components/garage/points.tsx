import React from 'react';
import PropTypes from 'prop-types';

interface propsType {
  allPoints: number;
}
const Points: React.FC<propsType> = (props) => {
  const { allPoints } = props;

  return (
    <div className="garage__points-wrapper">
      <div className="garage__points">{`Points ${allPoints}`}</div>
    </div>
  );
};

Points.propTypes = {
  allPoints: PropTypes.number.isRequired,
};

export default Points;
