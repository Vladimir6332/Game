declare interface SoundServiceInterface {
  audioContext: AudioContext | null;
  isSupportAudioContext: boolean;
  audioList: { [key: string]: HTMLAudioElement };
  isMoving: boolean;
  timerID: NodeJS.Timeout | null;
  init(): void;
  play(sound: string): void;
  setVolume(volume: number): void;
}
