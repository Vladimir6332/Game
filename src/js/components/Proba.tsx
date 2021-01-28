import * as PIXI from 'pixi.js-legacy';
import tankUrl from '../../assets/images/weapons/red/tank.png';
import tankUrlGood from '../../assets/images/weapons/brown/tank.png';
import brownBigBoom from '../../assets/images/weapons/brown/bigBOOM/bigBOOM.png';
import brownSpeed from '../../assets/images/weapons/brown/speed/speed.png';
import brownStandart from '../../assets/images/weapons/brown/standart/standart.png';
import brownSniper from '../../assets/images/weapons/brown/sniper/sniper.png';
import brownRockets from '../../assets/images/weapons/brown/rockets/rockets.png';
import redRockets from '../../assets/images/weapons/red/rockets/rockets.png';
import redBigBoom from '../../assets/images/weapons/red/bigBOOM/bigBOOM.png';
import redSpeed from '../../assets/images/weapons/red/speed/speed.png';
import redStandart from '../../assets/images/weapons/red/standart/standart.png';
import redSniper from '../../assets/images/weapons/red/sniper/sniper.png';
import redBulletBigBoom from '../../assets/images/weapons/red/bigBOOM/bullet.png';
import redBulletSpeed from '../../assets/images/weapons/red/speed/bullet.png';
import redBulletStandard from '../../assets/images/weapons/red/standart/bullet.png';
import redBulletSniper from '../../assets/images/weapons/red/sniper/bullet.png';
import redBulletRockets from '../../assets/images/weapons/red/rockets/bullet.png';
import brownBulletRockets from '../../assets/images/weapons/brown/rockets/bullet.png';
import brownBulletBigBoom from '../../assets/images/weapons/brown/bigBOOM/bullet.png';
import brownBulletSpeed from '../../assets/images/weapons/brown/speed/bullet.png';
import brownBulletStandard from '../../assets/images/weapons/brown/standart/bullet.png';
import brownBulletSniper from '../../assets/images/weapons/brown/sniper/bullet.png';
import imgMap from '../../assets/images/maps/map.png';
import imgBreak1 from '../../assets/images/blocks/break1.png';
import imgBreak2 from '../../assets/images/blocks/break2.png';
import imgBreak3 from '../../assets/images/blocks/break3.png';
import imgHidden from '../../assets/images/blocks/hidden.png';
import imgImmortal1 from '../../assets/images/blocks/immortal1.png';
import imgImmortal2 from '../../assets/images/blocks/immortal2.png';
import TankPlayer from './TankPlayer';
import TankComputer from './TankComputer';
import { TankUnit } from '../custom_typings/Tanks.d';

// const pixi = new PIXI.Application({ backgroundColor: 0xffffff });
interface Start {
  (): void;
}

interface Game {
  options: PlayOptions | null;
  pixi: PIXI.Application;
  tank: TankUnit;
  wall: boolean;
  init(options: PlayOptions): void;
  start(): void;
  stop(): void;
  loadAssets(startCallback: Start): void;
}
class GameApp implements Game {
  options: PlayOptions | null;

  pixi: PIXI.Application;

  tank: TankUnit;

  wall: boolean;

  constructor() {
    this.options = null;
    this.pixi = new PIXI.Application({ backgroundColor: 0xffffff });
  }

  init(options: PlayOptions | null): void {
    this.options = options;
    this.loadAssets();
  }

  loadAssets(): void {
    this.pixi.loader
      .add([
        { name: 'assets/images/red/tank.png', url: tankUrl },
        { name: 'assets/images/brown/tank.png', url: tankUrlGood },
        { name: 'assets/images/brown/speed/speed.png', url: brownSpeed },
        {
          name: 'assets/images/brown/standart/standart.png',
          url: brownStandart,
        },
        { name: 'assets/images/brown/sniper/sniper.png', url: brownSniper },
        { name: 'assets/images/brown/bigBOOM/bigBOOM.png', url: brownBigBoom },
        { name: 'assets/images/red/bigBOOM/bigBOOM.png', url: redBigBoom },
        { name: 'assets/images/red/speed/speed.png', url: redSpeed },
        { name: 'assets/images/red/standart/standart.png', url: redStandart },
        { name: 'assets/images/red/sniper/sniper.png', url: redSniper },
        { name: 'assets/images/red/rockets/rockets.png', url: redRockets },
        { name: 'assets/images/brown/rockets/rockets.png', url: brownRockets },
        { name: 'assets/images/brown/speed/bullet.png', url: brownBulletSpeed },
        {
          name: 'assets/images/brown/standart/bullet.png',
          url: brownBulletStandard,
        },
        {
          name: 'assets/images/brown/sniper/bullet.png',
          url: brownBulletSniper,
        },
        {
          name: 'assets/images/brown/bigBOOM/bullet.png',
          url: brownBulletBigBoom,
        },
        { name: 'assets/images/red/bigBOOM/bullet.png', url: redBulletBigBoom },
        { name: 'assets/images/red/speed/bullet.png', url: redBulletSpeed },
        {
          name: 'assets/images/red/standart/bullet.png',
          url: redBulletStandard,
        },
        { name: 'assets/images/red/sniper/bullet.png', url: redBulletSniper },
        { name: 'assets/images/red/rockets/bullet.png', url: redBulletRockets },
        {
          name: 'assets/images/brown/rockets/bullet.png',
          url: brownBulletRockets,
        },
        { name: 'assets/images/maps/map.png', url: imgMap },
        { name: 'assets/images/blocks/break1.png', url: imgBreak1 },
        { name: 'assets/images/blocks/break2.png', url: imgBreak2 },
        { name: 'assets/images/blocks/break3.png', url: imgBreak3 },
        { name: 'assets/images/blocks/hidden.png', url: imgHidden },
        { name: 'assets/images/blocks/immortal1.png', url: imgImmortal1 },
        { name: 'assets/images/blocks/immortal2.png', url: imgImmortal2 },
      ])
      .load(this.start.bind(this));
  }

  start(): void {
    const reelContainer = new PIXI.Container();
    const musTankBad: TankUnit[] = [];
    const map = new PIXI.Sprite(
      PIXI.Texture.from('assets/images/maps/map.png')
    );
    map.width = this.pixi.screen.width;
    map.height = this.pixi.screen.height;
    const musImmortalBlocks: Array<PIXI.Sprite> = [];
    const musBreakBlocks: Array<PIXI.Sprite> = [];
    const musHiddenBlocks: Array<PIXI.Sprite> = [];
    this.tank = new (TankPlayer as any)(
      0,
      this.pixi.screen.height / 2,
      'assets/images/brown/sniper/sniper.png', // название пушки
      400, // дальность пушки x * 4
      500, // время перезорядки 5000 / x
      20, // скорость пули x * 2.5
      95, // урон
      this.pixi.screen.width,
      this.pixi.screen.height,
      reelContainer,
      musTankBad,
      musImmortalBlocks,
      musBreakBlocks
    );

    const arrGanBad = [
      {
        src: 'assets/images/red/bigBOOM/bigBOOM.png',
        damage: 95,
        range: 70 * 4,
        speadBullet: 2.5 * 5,
        speadGan: 5000 / 3,
      },
      {
        src: 'assets/images/red/rockets/rockets.png',
        damage: 40,
        range: 75 * 4,
        speadBullet: 2.5 * 3,
        speadGan: 5000 / 10,
      },
      {
        src: 'assets/images/red/sniper/sniper.png',
        damage: 20,
        range: 100 * 4,
        speadBullet: 7 * 2.5,
        speadGan: 5000 / 5,
      },
      {
        src: 'assets/images/red/standart/standart.png',
        damage: 10,
        range: 55 * 4,
        speadBullet: 2.5 * 2,
        speadGan: 5000 / 5,
      },
      {
        src: 'assets/images/red/speed/speed.png',
        damage: 5,
        range: 67 * 4,
        speadBullet: 2.5 * 10,
        speadGan: 5000 / 10,
      },
    ];

    for (let i = 0; i < 3; i += 1) {
      let x = randomNumber(this.pixi.screen.width / 2 - 100);
      let y = randomNumber(this.pixi.screen.height);
      x += this.pixi.screen.width / 2 + 100;
      if (x > this.pixi.screen.width - this.pixi.screen.width * 0.1) {
        x -= this.pixi.screen.width * 0.1;
      } else if (x < this.pixi.screen.width * 0.1) {
        x += this.pixi.screen.width * 0.1;
      }
      if (y > this.pixi.screen.height - this.pixi.screen.height * 0.1) {
        y -= this.pixi.screen.height * 0.1;
      } else if (y < this.pixi.screen.height * 0.1) {
        y += this.pixi.screen.height * 0.1;
      }
      const index = randomNumber(arrGanBad.length);
      const tankBad = new (TankComputer as any)(
        x,
        y,
        arrGanBad[index].src,
        arrGanBad[index].range,
        arrGanBad[index].speadGan,
        arrGanBad[index].speadBullet,
        arrGanBad[index].damage,
        this.pixi.screen.width,
        this.pixi.screen.height,
        reelContainer,
        this.tank,
        musImmortalBlocks,
        musBreakBlocks
      );
      musTankBad.push(tankBad);
    }
    const arrImmortalMap = [
      'assets/images/blocks/immortal1.png',
      'assets/images/blocks/immortal2.png',
    ];
    const arrBreakMap = [
      'assets/images/blocks/break1.png',
      'assets/images/blocks/break2.png',
      'assets/images/blocks/break3.png',
    ];
    const musRender: Array<PIXI.Sprite> = [];
    const musRenderGanAndHealth: Array<PIXI.Graphics | PIXI.Sprite> = [];
    musTankBad.forEach((tankBad) => {
      tankBad.init();
      musRender.push(tankBad.sprite);
      musRenderGanAndHealth.push(tankBad.gan, tankBad.healthRender);
    });
    this.tank.init();

    musImmortalBlocks.push(
      ...this.createMapBlock(
        arrImmortalMap,
        [[this.tank.sprite], musTankBad.map((tankB) => tankB.sprite)],
        randomNumber(5) + 1
      )
    );
    musBreakBlocks.push(
      ...this.createMapBlock(
        arrBreakMap,
        [
          [this.tank.sprite],
          musTankBad.map((tankB) => tankB.sprite),
          musImmortalBlocks,
        ],
        randomNumber(5) + 1
      )
    );
    musHiddenBlocks.push(
      ...this.createMapBlock(
        ['assets/images/blocks/hidden.png'],
        [musBreakBlocks, musImmortalBlocks],
        randomNumber(7) + 5
      )
    );

    this.pixi.view.addEventListener('mousemove', (e) => {
      if (this.tank.checkPause) return;
      this.tank.moveGan(e.offsetX, e.offsetY);
    });

    window.addEventListener('keydown', (e) => {
      if (this.tank.checkPause) return;
      this.tank.moveTank(e.code);
    });

    this.pixi.view.addEventListener('click', (e) => {
      if (this.tank.checkPause) return;
      this.tank.shut(e.offsetX, e.offsetY);
    });

    reelContainer.addChild(
      map,
      this.tank.sprite,
      ...musRender,
      ...musImmortalBlocks,
      ...musBreakBlocks,
      this.tank.aimRender,
      this.tank.gan,
      this.tank.healthRender,
      ...musRenderGanAndHealth,
      ...musHiddenBlocks
    );
    this.pixi.stage.addChild(reelContainer);
  }

  stop(): void {
    this.tank.stopGame();
  }

  checkMap(
    wall2: {
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
    },
    r2: {
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
    }
  ): boolean {
    this.wall = false;
    const width = wall2.width < r2.height;
    const widthSprite = r2.width / 2;
    const heightSprite = r2.height / 2;
    if (r2.rotation % Math.PI === 0) {
      if (width) {
        if (
          (wall2.x - wall2.width / 2 >= r2.x - widthSprite &&
            wall2.x - wall2.width / 2 <= r2.x + widthSprite &&
            wall2.y - wall2.height / 2 >= r2.y - heightSprite &&
            wall2.y - wall2.height / 2 <= r2.y + heightSprite) ||
          (wall2.x - wall2.width / 2 >= r2.x - widthSprite &&
            wall2.x - wall2.width / 2 <= r2.x + widthSprite &&
            wall2.y + wall2.height / 2 >= r2.y - heightSprite &&
            wall2.y + wall2.height / 2 <= r2.y + heightSprite) ||
          (wall2.x + wall2.width / 2 >= r2.x - widthSprite &&
            wall2.x + wall2.width / 2 <= r2.x + widthSprite &&
            wall2.y - wall2.height / 2 >= r2.y - heightSprite &&
            wall2.y - wall2.height / 2 <= r2.y + heightSprite) ||
          (wall2.x + wall2.width / 2 >= r2.x - widthSprite &&
            wall2.x + wall2.width / 2 <= r2.x + widthSprite &&
            wall2.y + wall2.height / 2 >= r2.y - heightSprite &&
            wall2.y + wall2.height / 2 <= r2.y + heightSprite)
        ) {
          this.wall = true;
        }
      } else if (!width) {
        if (
          (r2.x - widthSprite >= wall2.x - wall2.width / 2 &&
            r2.x - widthSprite <= wall2.x + wall2.width / 2 &&
            r2.y - heightSprite >= wall2.y - wall2.height / 2 &&
            r2.y - heightSprite <= wall2.y + wall2.height / 2) ||
          (r2.x + widthSprite >= wall2.x - wall2.width / 2 &&
            r2.x + widthSprite <= wall2.x + wall2.width / 2 &&
            r2.y - heightSprite >= wall2.y - wall2.height / 2 &&
            r2.y - heightSprite <= wall2.y + wall2.height / 2) ||
          (r2.x + widthSprite >= wall2.x - wall2.width / 2 &&
            r2.x + widthSprite <= wall2.x + wall2.width / 2 &&
            r2.y + heightSprite >= wall2.y - wall2.height / 2 &&
            r2.y + heightSprite <= wall2.y + wall2.height / 2) ||
          (r2.x - widthSprite >= wall2.x - wall2.width / 2 &&
            r2.x - widthSprite <= wall2.x + wall2.width / 2 &&
            r2.y + heightSprite >= wall2.y - wall2.height / 2 &&
            r2.y + heightSprite <= wall2.y + wall2.height / 2)
        ) {
          this.wall = true;
        }
      }
    } else if (r2.rotation % Math.PI !== 0) {
      if (width) {
        if (
          (wall2.x - wall2.width / 2 >= r2.x - heightSprite &&
            wall2.x - wall2.width / 2 <= r2.x + heightSprite &&
            wall2.y - wall2.height / 2 >= r2.y - widthSprite &&
            wall2.y - wall2.height / 2 <= r2.y + widthSprite) ||
          (wall2.x - wall2.width / 2 >= r2.x - heightSprite &&
            wall2.x - wall2.width / 2 <= r2.x + heightSprite &&
            wall2.y + wall2.height / 2 >= r2.y - widthSprite &&
            wall2.y + wall2.height / 2 <= r2.y + widthSprite) ||
          (wall2.x + wall2.width / 2 >= r2.x - heightSprite &&
            wall2.x + wall2.width / 2 <= r2.x + heightSprite &&
            wall2.y - wall2.height / 2 >= r2.y - widthSprite &&
            wall2.y - wall2.height / 2 <= r2.y + widthSprite) ||
          (wall2.x + wall2.width / 2 >= r2.x - heightSprite &&
            wall2.x + wall2.width / 2 <= r2.x + heightSprite &&
            wall2.y + wall2.height / 2 >= r2.y - widthSprite &&
            wall2.y + wall2.height / 2 <= r2.y + widthSprite)
        ) {
          this.wall = true;
        }
      } else if (!width) {
        if (
          (r2.x - heightSprite >= wall2.x - wall2.width / 2 &&
            r2.x - heightSprite <= wall2.x + wall2.width / 2 &&
            r2.y - widthSprite >= wall2.y - wall2.height / 2 &&
            r2.y - widthSprite <= wall2.y + wall2.height / 2) ||
          (r2.x + heightSprite >= wall2.x - wall2.width / 2 &&
            r2.x + heightSprite <= wall2.x + wall2.width / 2 &&
            r2.y - widthSprite >= wall2.y - wall2.height / 2 &&
            r2.y - widthSprite <= wall2.y + wall2.height / 2) ||
          (r2.x + heightSprite >= wall2.x - wall2.width / 2 &&
            r2.x + heightSprite <= wall2.x + wall2.width / 2 &&
            r2.y + widthSprite >= wall2.y - wall2.height / 2 &&
            r2.y + widthSprite <= wall2.y + wall2.height / 2) ||
          (r2.x - heightSprite >= wall2.x - wall2.width / 2 &&
            r2.x - heightSprite <= wall2.x + wall2.width / 2 &&
            r2.y + widthSprite >= wall2.y - wall2.height / 2 &&
            r2.y + widthSprite <= wall2.y + wall2.height / 2)
        ) {
          this.wall = true;
        }
      }
    }
    return this.wall;
  }

  createMapBlock(
    arrMap: Array<string>,
    arrCheck: Array<PIXI.Sprite[]>,
    numTo: number
  ): PIXI.Sprite[] {
    const arr: Array<PIXI.Sprite> = [];
    for (let i = 0; i < numTo; i += 1) {
      const block = new PIXI.Sprite(
        PIXI.Texture.from(arrMap[randomNumber(arrMap.length)])
      );
      block.pivot.x = block.width / 2;
      block.pivot.y = block.height / 2;
      block.width = this.pixi.screen.height * 0.08;
      block.height = this.pixi.screen.height * 0.08;
      block.x = randomNumber(this.pixi.screen.width);
      block.y = randomNumber(this.pixi.screen.height);
      if (block.x > this.pixi.screen.width - block.width / 2) {
        block.x -= block.width / 2;
      } else if (block.x < block.width / 2) {
        block.x += block.width / 2;
      }
      if (block.y > this.pixi.screen.height - block.height / 2) {
        block.y -= block.height / 2;
      } else if (block.y < block.height / 2) {
        block.y += block.height / 2;
      }
      while (
        arrCheck.some((arr1) =>
          arr1.some((elem: PIXI.Sprite) => this.checkMap(block, elem))
        ) ||
        arr.some((blok) => this.checkMap(blok, block))
      ) {
        block.x = randomNumber(this.pixi.screen.width);
        block.y = randomNumber(this.pixi.screen.height);
        if (block.x > this.pixi.screen.width - block.width / 2) {
          block.x -= block.width / 2;
        } else if (block.x < block.width / 2) {
          block.x += block.width / 2;
        }
        if (block.y > this.pixi.screen.height - block.height / 2) {
          block.y -= block.height / 2;
        } else if (block.y < block.height / 2) {
          block.y += block.height / 2;
        }
      }
      arr.push(block);
    }
    return arr;
  }
}

export default GameApp;

function randomNumber(x: number) {
  return Math.floor(Math.random() * x);
}
