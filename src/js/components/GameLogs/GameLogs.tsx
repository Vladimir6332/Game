import React from 'react';
import getCurrentLog from '../../servise/menu_logs_getCurrentLog';

const logs: Array<Logs> = [];
const GameLogs: React.FC<LogsProp> = ({ log }: LogsProp) => {
  if (logs[logs.length - 1] !== log && log.typeMessage !== 'null') {
    if (logs.length === 4) logs.shift();
    logs.push(log);
  }

  const jsxArrLogs: Array<JSX.Element> = logs.map(getCurrentLog);
  return (
    <div className="logs">
      <ul className="logs__ul">{jsxArrLogs}</ul>
    </div>
  );
};

export default GameLogs;
