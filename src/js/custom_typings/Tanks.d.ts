import * as PIXI from 'pixi.js-legacy';

declare interface TankPl {
  (
    x: number,
    y: number,
    gan: string,
    aim: number,
    timeCallDown: number,
    speadBullet: number,
    damage: number,
    appWidth: number,
    appHeigth: number,
    conteiner: PIXI.Container,
    evil: Array<TankUnit>,
    musImmortalBlocks: Array<PIXI.Sprite>,
    musBreakBlocks: Array<PIXI.Sprite>
  ): void;
}

declare interface TankUnit {
  sprite: PIXI.Sprite;
  init(): void;
  checkPause(): void;
  moveGan(x: number, y: number): void;
  moveTank(code: string): void;
  shut(x: number, y: number): void;
  stopGame(): void;
  aimRender: PIXI.Graphics;
  healthRender: PIXI.Graphics;
  gan: PIXI.Sprite;
  health: number;
  checkFind: boolean;
  time: NodeJS.Timeout;
  findPlayer(): void;
}
