import React from 'react';
import PropTypes from 'prop-types';
import tankPaths from './tankImg';

interface PropsTankRules {
  properties: Array<string>;
}
const Tank: React.FC<PropsTankRules> = (props) => {
  const { properties } = props;
  const name: string = properties[1];

  const tank: string = tankPaths[name];
  return (
    <div className="garage__tank-wrapper">
      <img src={tank} alt="tank" className="garage__tank" />
    </div>
  );
};

Tank.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Tank;
