interface statisticsInfo {
  kills: number;
  deaths: number;
  lastTime: number;
}

const saveIncomingTime = (kills = 0, deaths = 0, lastTime = 0): void => {
  const currentStatistics = localStorage.getItem('_statistics');
  let updatedStatistics: statisticsInfo;

  if (currentStatistics) {
    const parseCurrentStatistics = JSON.parse(currentStatistics);

    updatedStatistics = {
      kills: kills + parseCurrentStatistics.kills,
      deaths: deaths + parseCurrentStatistics.deaths,
      lastTime,
    };
  } else {
    updatedStatistics = {
      kills,
      deaths,
      lastTime,
    };
  }
  const jsonUpdatedStatistics: string = JSON.stringify(updatedStatistics);
  localStorage.setItem('_statistics', jsonUpdatedStatistics);
};
