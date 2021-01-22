const getTimeInGame = (ms: number): string => {
  const timeName = ['hours', 'minutes', 'seconds'];
  const date: Date = new Date(ms);
  const time = date.toUTCString();
  const timeInGame = time.match(/\d\d:\d\d:\d\d/);
  const arrTime = timeInGame[0].split(':');
  const res = arrTime.reduce((all, item, index) => {
    if (item !== '00') {
      const normalTime =
        item[0] !== '0'
          ? `${item} ${timeName[index]}`
          : `${item[1]} ${timeName[index]}`;
      return `${all} ${normalTime}`;
    }
    return all;
  }, '');
  return res;
};

export default getTimeInGame;
