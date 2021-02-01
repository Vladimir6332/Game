import React from 'react';
import getCurrentLog from '../../servise/menu_logs_getCurrentLog';

let logs: Array<Logs> = [];
const GameLogs: React.FC<LogsProp> = ({ log, isNewGame, isEsc }: LogsProp) => {
  const copy = log;

  if (isNewGame || isEsc) logs = [];
  console.log('LOGS', logs);
  if (
    logs[logs.length - 1] !== log &&
    log.typeMessage !== 'null' &&
    !isNewGame &&
    !isEsc
  ) {
    copy.id = `${Math.random() + log.message}`;
    if (logs.length === 4) logs.shift();
    logs.push(copy);
  }

  const jsxArrLogs: Array<JSX.Element> = logs.map(getCurrentLog);
  return (
    <div className="logs">
      <ul className="logs__ul">{jsxArrLogs}</ul>
    </div>
  );
};

export default GameLogs;
