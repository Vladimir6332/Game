import React from 'react';

const getCurrentLog = (item: Logs): JSX.Element => {
  const { typeMessage } = item;
  let result: JSX.Element;
  if (typeMessage === 'damage me') {
    result = (
      <li className="green" key={item.id}>
        {`You have dealt ${item.message} damage`}
      </li>
    );
  } else if (typeMessage === 'damage enemy') {
    result = (
      <li className="red" key={item.id}>
        {`You have taken ${item.message} damage`}
      </li>
    );
  } else if (typeMessage === 'death me') {
    result = (
      <li className="black" key={item.id}>
        You have killed by enemy...
      </li>
    );
  } else if (typeMessage === 'death enemy') {
    result = (
      <li className="orange" key={item.id}>
        You have killed the enemy
      </li>
    );
  }
  return result;
};

export default getCurrentLog;
