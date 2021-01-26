import React from 'react';

const getCurrentLog = (item: Logs, index: number): JSX.Element => {
  const key = `${index}id`;
  const { typeMessage } = item;
  let result: JSX.Element;
  if (typeMessage === 'damage me') {
    result = (
      <li className="green" key={key}>
        {`You have dealt ${item.message} damage`}
      </li>
    );
  } else if (typeMessage === 'damage enemy') {
    result = (
      <li className="red" key={key}>
        {`You have taken ${item.message} damage`}
      </li>
    );
  } else if (typeMessage === 'death me') {
    result = (
      <li className="black" key={key}>
        You have killed by enemy...
      </li>
    );
  } else if (typeMessage === 'death enemy') {
    result = (
      <li className="orange" key={key}>
        You have killed the enemy
      </li>
    );
  }
  return result;
};

export default getCurrentLog;
