export default class Timer implements TimerInterface {
  time: number;

  isActive: boolean;

  startDate: number;

  constructor(time: number) {
    this.time = time;
    this.isActive = false;
    this.startDate = 0;
  }

  start(): void {
    if (!this.isActive) {
      this.startDate = Date.now();
      this.isActive = true;
    }
  }

  stop(): void {
    if (this.isActive) {
      this.updateTimer();
      this.startDate = 0;
      this.isActive = false;
    }
  }

  updateTimer(): void {
    if (this.isActive) {
      this.time += Date.now() - this.startDate;
      this.startDate = Date.now();
    }
  }

  getTime(): number {
    this.updateTimer();
    return this.time;
  }
}
