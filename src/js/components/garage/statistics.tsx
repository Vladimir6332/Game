import React from 'react';
import PropsType from 'prop-types';

interface PropsStatistics {
  properties: {
    kills: number;
    deaths: number;
    lastTime: string;
    hitPercentage: number;
  };
}

const Statistics: React.FC<PropsStatistics> = (props) => {
  const { properties } = props;
  const { kills, deaths, lastTime, hitPercentage } = properties;

  return (
    <div className="garage__statistics">
      <div>
        <h2 className="garage__statistics-title">Statistics</h2>
        <table className="garage__statistics-table">
          <tbody className="garage__statistics-table-tbody">
            <tr>
              <td>Your kills: </td>
              <td>{kills}</td>
            </tr>
            <tr>
              <td>Your deaths: </td>
              <td>{deaths}</td>
            </tr>
            <tr>
              <td>Hit percentage: </td>
              <td>{`${hitPercentage}%`}</td>
            </tr>
            <tr>
              <td>Last visit: </td>
              <td>{lastTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  properties: PropsType.exact({
    kills: PropsType.number.isRequired,
    deaths: PropsType.number.isRequired,
    lastTime: PropsType.string.isRequired,
    hitPercentage: PropsType.number.isRequired,
  }).isRequired,
};
export default Statistics;
