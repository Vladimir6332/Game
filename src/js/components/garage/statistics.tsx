import React from 'react';
import PropsType from 'prop-types';

interface PropsStatistics {
  properties: {
    [x: string]: number;
  };
}

const Statistics: React.FC<PropsStatistics> = (props) => {
  const { properties } = props;
  const { kills, deaths, lastTime, hitPercentage } = properties;

  return (
    <div className="garage__statistics">
      <h2 className="garage__statistics-title">Statistics</h2>
      <ul className="garage__statistics-ul">
        <li className="garage__statistics-li">{`Your kills: ${kills}`}</li>
        <li className="garage__statistics-li">{`Your deaths: ${deaths}`}</li>
        <li className="garage__statistics-li">{`Hit percentage : ${hitPercentage}`}</li>
        <li className="garage__statistics-li">{`You were not in the game for ${lastTime} hours`}</li>
      </ul>
    </div>
  );
};

Statistics.propTypes = {
  properties: PropsType.objectOf(PropsType.number).isRequired,
};
export default Statistics;
