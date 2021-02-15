import moveLink from '../../assets/sounds/move.mp3';
import hitLink from '../../assets/sounds/hit.mp3';
import shotLink from '../../assets/sounds/shot.mp3';
import explosionLink from '../../assets/sounds/explosion.mp3';

export default class SoundService implements SoundServiceInterface {
  audioContext: AudioContext | null;

  isSupportAudioContext: boolean;

  audioList: { [key: string]: HTMLAudioElement };

  isMoving: boolean;

  timerID: NodeJS.Timeout | null;

  constructor() {
    this.audioContext = null;
    this.isSupportAudioContext = false;
    this.isMoving = false;
    this.timerID = null;
  }

  init(): void {
    this.audioList = {
      move: new Audio(moveLink),
      hit: new Audio(hitLink),
      shot: new Audio(shotLink),
      explosion: new Audio(explosionLink),
    };

    // try {
    //   this.audioContext = new window.AudioContext();
    // } catch (error) {
    //   window.alert(`Sorry, this browser doesn't support Web Audio API!`);
    // }

    // if (this.audioContext !== undefined) {
    //   this.isSupportAudioContext = true;
    // }
  }

  play(sound: string): void {
    const audio = this.audioList[sound];
    if (audio) {
      if (sound === 'move') {
        if (this.isMoving) {
          clearTimeout(this.timerID);
          this.timerID = setTimeout(() => {
            this.isMoving = false;
            audio.pause();
            audio.currentTime = 0;
          }, 100);
        } else {
          audio.play();
          this.isMoving = true;
          this.timerID = setTimeout(() => {
            this.isMoving = false;
            audio.pause();
            audio.currentTime = 0;
          }, 100);
        }
      } else {
        audio.currentTime = 0;
        audio.play();
      }
    }
  }

  setVolume(volume: number): void {
    Object.values(this.audioList).forEach((clip: HTMLAudioElement) => {
      const audio = clip;
      audio.volume = volume;
    });
  }
}
