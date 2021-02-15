interface statisticsInfo {
  kills: number;
  deaths: number;
  lastTime: string;
  hitPercentage: number;
  points: number;
}

const saveIncomingTime = (
  kills = 0,
  deaths = 0,
  lastTime = '',
  points = 0,
  hitPercentage: 0
): void => {
  const currentStatistics = localStorage.getItem('_statistics');
  let updatedStatistics: statisticsInfo;

  if (currentStatistics) {
    const parseCurrentStatistics = JSON.parse(currentStatistics);

    updatedStatistics = {
      kills: kills + parseCurrentStatistics.kills,
      deaths: deaths + parseCurrentStatistics.deaths,
      lastTime,
      hitPercentage,
      points,
    };
  } else {
    updatedStatistics = {
      kills,
      deaths,
      lastTime,
      hitPercentage,
      points,
    };
  }
  const jsonUpdatedStatistics: string = JSON.stringify(updatedStatistics);
  localStorage.setItem('_statistics', jsonUpdatedStatistics);
};

export default saveIncomingTime;
