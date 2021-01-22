import React from 'react';
import PropsType from 'prop-types';
import getTimeInGame from './getTimeInGame';

interface PropsStatistics {
  properties: {
    kills: number;
    deaths: number;
    lastVisit: Date;
    accuracy: number;
    timeInGame: number;
  };
}

const Statistics: React.FC<PropsStatistics> = (props) => {
  const { properties } = props;
  const { kills, deaths, lastVisit, accuracy, timeInGame } = properties;

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
              <td>{`${accuracy}%`}</td>
            </tr>
            <tr>
              <td>Last visit: </td>
              <td>{lastVisit.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Time in game</td>
              <td>{getTimeInGame(timeInGame)}</td>
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
    lastVisit: PropsType.instanceOf(Date),
    accuracy: PropsType.number.isRequired,
    timeInGame: PropsType.number.isRequired,
  }).isRequired,
};
export default Statistics;
