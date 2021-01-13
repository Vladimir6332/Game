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
              <td>{hitPercentage}</td>
            </tr>
            <tr>
              <td>Last visit: </td>
              <td>{`1${lastTime}.10.20: 10:50`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  properties: PropsType.objectOf(PropsType.number).isRequired,
};
export default Statistics;
