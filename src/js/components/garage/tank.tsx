import React from 'react';
import PropTypes from 'prop-types';
import tankPaths from './tankImg';

interface PropsTankRules {
  name: string;
}
const Tank: React.FC<PropsTankRules> = ({ name }) => {
  const tank: string = tankPaths[name];
  return (
    <div className="garage__tank-wrapper">
      <img src={tank} alt="tank" className="garage__tank" />
    </div>
  );
};

Tank.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Tank;
