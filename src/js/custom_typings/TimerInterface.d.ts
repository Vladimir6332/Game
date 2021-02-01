declare interface TimerInterface {
  time: number;
  isActive: boolean;
  startDate: number;
  start(): void;
  stop(): void;
  getTime(): number;
}
