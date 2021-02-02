import { Statistics } from '../custom_typings/Tanks.d';
import Timer from './Timer';

export default class StatisticsService implements Statistics {
  statistics: ProfileOfUser | null;

  timer: TimerInterface;

  constructor(userProfile: ProfileOfUser) {
    this.statistics = { ...userProfile } || null;
  }

  init(userProfile: ProfileOfUser): void {
    this.statistics = { ...userProfile };
    this.timer = new Timer(userProfile.timeInGame);
    this.timer.start();
  }

  updateKills(value: number): void {
    console.log('UPDATE KILLLLLLLLLSSSSSSSSSSSSSSSSSSSSSSSS');
    this.statistics.kills = value;
  }

  updateDeaths(value: number): void {
    this.statistics.deaths = value;
  }

  updateShots(): void {
    this.statistics.shots += 1;
    this.statistics.accuracy =
      +(this.statistics.accurateShots / this.statistics.shots).toFixed(2) * 100;
  }

  updateAccurateShots(): void {
    this.statistics.accurateShots += 1;
    this.statistics.accuracy =
      +(this.statistics.accurateShots / this.statistics.shots).toFixed(2) * 100;
  }

  getUpdatedStatistics() {
    return this.statistics;
  }

  // Send to backend
  async send(): Promise<void> {
    this.statistics.timeInGame = this.timer.getTime();
    console.log('SEND STAT', this.statistics);

    const data = { ...this.statistics };
    const url = `https://rs-clone-wars-be.herokuapp.com/statistics`;
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const userProfile = await res.json();
    console.log('res STAT', userProfile);
  }

  destroy(): ProfileOfUser {
    this.timer.stop();
    this.statistics.timeInGame = this.timer.getTime();
    this.send();
    return this.statistics;
  }
}
