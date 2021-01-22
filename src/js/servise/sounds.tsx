import moveLink from '../../assets/sounds/move.mp3';
import hitLink from '../../assets/sounds/hit.mp3';
import shotLink from '../../assets/sounds/shot.mp3';
import explosionLink from '../../assets/sounds/explosion.mp3';

const move = (): void => {
  const audio = new Audio(moveLink);
  audio.play();
};

const hit = (): void => {
  const audio = new Audio(hitLink);
  audio.play();
};

const shot = (): void => {
  const audio = new Audio(shotLink);
  audio.play();
};

const explosion = (): void => {
  const audio = new Audio(explosionLink);
  audio.play();
};

export { move, hit, shot, explosion };
