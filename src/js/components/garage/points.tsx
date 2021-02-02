import React from 'react';
import PropTypes from 'prop-types';

interface propsType {
  allPoints: number;
  name: string;
}
const Points: React.FC<propsType> = (props) => {
  const { allPoints, name } = props;

  return (
    <div className="garage__points-wrapper">
      <div className="garage__points">{`Points ${allPoints}`}</div>
      <h2>{`Your nickname: ${name}`}</h2>
    </div>
  );
};

Points.propTypes = {
  allPoints: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Points;
