import * as PIXI from 'pixi.js-legacy';
import tankUrl from '../../assets/images/weapons/red/tank.png';
import tankUrlGood from '../../assets/images/weapons/brown/tank.png';
import brownBigBoom from '../../assets/images/weapons/brown/bigBOOM/bigBOOM.png';
import brownSpeed from '../../assets/images/weapons/brown/speed/speed.png';
import brownStandart from '../../assets/images/weapons/brown/standart/standart.png';
import brownSniper from '../../assets/images/weapons/brown/sniper/sniper.png';
import redBigBoom from '../../assets/images/weapons/red/bigBOOM/bigBOOM.png';
import redSpeed from '../../assets/images/weapons/red/speed/speed.png';
import redStandart from '../../assets/images/weapons/red/standart/standart.png';
import redSniper from '../../assets/images/weapons/red/sniper/sniper.png';
import redbulletBigBoom from '../../assets/images/weapons/red/bigBOOM/bullet.png';
import redbulletSpeed from '../../assets/images/weapons/red/speed/bullet.png';
import redbulletStandart from '../../assets/images/weapons/red/standart/bullet.png';
import redbulletSniper from '../../assets/images/weapons/red/sniper/bullet.png';
import brownbulletBigBoom from '../../assets/images/weapons/brown/bigBOOM/bullet.png';
import brownbulletSpeed from '../../assets/images/weapons/brown/speed/bullet.png';
import brownbulletStandart from '../../assets/images/weapons/brown/standart/bullet.png';
import brownbulletSniper from '../../assets/images/weapons/brown/sniper/bullet.png';
import imgMap from '../../assets/images/maps/map.png';
import imgBreak1 from '../../assets/images/blocks/break1.png';
import imgBreak2 from '../../assets/images/blocks/break2.png';
import imgBreak3 from '../../assets/images/blocks/break3.png';
import imgHidden from '../../assets/images/blocks/hidden.png';
import imgImmortal1 from '../../assets/images/blocks/immortal1.png';
import imgImmortal2 from '../../assets/images/blocks/immortal2.png';
import TankPlayer from './TankPlayer';
import TankComputer from './TankComputer';

const app = new PIXI.Application({ backgroundColor: 0xffffff });

app.loader
  .add([
    { name: 'assets/images/red/tank.png', url: tankUrl },
    { name: 'assets/images/brown/tank.png', url: tankUrlGood },
    { name: 'assets/images/brown/speed/speed.png', url: brownSpeed },
    { name: 'assets/images/brown/standart/standart.png', url: brownStandart },
    { name: 'assets/images/brown/sniper/sniper.png', url: brownSniper },
    { name: 'assets/images/brown/bigBOOM/bigBOOM.png', url: brownBigBoom },
    { name: 'assets/images/red/bigBOOM/bigBOOM.png', url: redBigBoom },
    { name: 'assets/images/red/speed/speed.png', url: redSpeed },
    { name: 'assets/images/red/standart/standart.png', url: redStandart },
    { name: 'assets/images/red/sniper/sniper.png', url: redSniper },
    { name: 'assets/images/brown/speed/bullet.png', url: brownbulletSpeed },
    {
      name: 'assets/images/brown/standart/bullet.png',
      url: brownbulletStandart,
    },
    { name: 'assets/images/brown/sniper/bullet.png', url: brownbulletSniper },
    { name: 'assets/images/brown/bigBOOM/bullet.png', url: brownbulletBigBoom },
    { name: 'assets/images/red/bigBOOM/bullet.png', url: redbulletBigBoom },
    { name: 'assets/images/red/speed/bullet.png', url: redbulletSpeed },
    { name: 'assets/images/red/standart/bullet.png', url: redbulletStandart },
    { name: 'assets/images/red/sniper/bullet.png', url: redbulletSniper },
    { name: 'assets/images/maps/map.png', url: imgMap },
    { name: 'assets/images/blocks/break1.png', url: imgBreak1 },
    { name: 'assets/images/blocks/break2.png', url: imgBreak2 },
    { name: 'assets/images/blocks/break3.png', url: imgBreak3 },
    { name: 'assets/images/blocks/hidden.png', url: imgHidden },
    { name: 'assets/images/blocks/immortal1.png', url: imgImmortal1 },
    { name: 'assets/images/blocks/immortal2.png', url: imgImmortal2 },
  ])
  .load(onAssetsLoaded);

function onAssetsLoaded() {
  const reelContainer = new PIXI.Container();
  const musTankBad: Array<any> = [];
  const map = new PIXI.Sprite(PIXI.Texture.from('assets/images/maps/map.png'));
  map.width = app.screen.width;
  map.height = app.screen.height;
  const musImmortalBlocks: Array<any> = [];
  const musBreakBlocks: Array<any> = [];
  const musHiddenBlocks: Array<any> = [];
  const tank = new (TankPlayer as any)(
    0,
    app.screen.height / 2,
    'assets/images/brown/sniper/sniper.png',
    400,
    500,
    app.screen.width,
    app.screen.height,
    reelContainer,
    musTankBad,
    musImmortalBlocks,
    musBreakBlocks
  );
  const arrImages = [
    'assets/images/red/bigBOOM/bigBOOM.png',
    'assets/images/red/speed/speed.png',
    'assets/images/red/standart/standart.png',
    'assets/images/red/sniper/sniper.png',
  ];

  for (let i = 0; i < 3; i += 1) {
    let x = randomeNumber(app.screen.width / 2 - 100);
    let y = randomeNumber(app.screen.height);
    x += app.screen.width / 2 + 100;
    if (x > app.screen.width - app.screen.width * 0.1) {
      x -= app.screen.width * 0.1;
    } else if (x < app.screen.width * 0.1) {
      x += app.screen.width * 0.1;
    }
    if (y > app.screen.height - app.screen.height * 0.1) {
      y -= app.screen.height * 0.1;
    } else if (y < app.screen.height * 0.1) {
      y += app.screen.height * 0.1;
    }
    const tankBad = new (TankComputer as any)(
      x,
      y,
      arrImages[randomeNumber(arrImages.length)],
      400,
      500,
      app.screen.width,
      app.screen.height,
      reelContainer,
      tank,
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
  const musRender: Array<any> = [];
  const musRenderGanAndHealth: Array<any> = [];
  musTankBad.forEach((tankBad) => {
    tankBad.init();
    musRender.push(tankBad.sprite);
    musRenderGanAndHealth.push(tankBad.gan, tankBad.healthRender);
  });
  tank.init();

  musImmortalBlocks.push(
    ...ckeateMapBlock(
      arrImmortalMap,
      [[tank.sprite], musTankBad.map((tankB) => tankB.sprite)],
      randomeNumber(5) + 1
    )
  );
  musBreakBlocks.push(
    ...ckeateMapBlock(
      arrBreakMap,
      [
        [tank.sprite],
        musTankBad.map((tankB) => tankB.sprite),
        musImmortalBlocks,
      ],
      randomeNumber(5) + 1
    )
  );
  musHiddenBlocks.push(
    ...ckeateMapBlock(
      ['assets/images/blocks/hidden.png'],
      [musBreakBlocks, musImmortalBlocks],
      randomeNumber(7) + 5
    )
  );

  app.view.addEventListener('mousemove', (e) => {
    if (tank.checkPause) return;
    tank.moveGan(e.offsetX, e.offsetY);
  });

  window.addEventListener('keydown', (e) => {
    if (tank.checkPause) return;
    tank.moveTank(e.code);
  });

  app.view.addEventListener('click', (e) => {
    if (tank.checkPause) {
      tank.continue();
    } else {
      tank.pause();
    }
    if (tank.checkPause) return;
    tank.shut(e.offsetX, e.offsetY);
  });

  reelContainer.addChild(
    map,
    tank.sprite,
    ...musRender,
    ...musImmortalBlocks,
    ...musBreakBlocks,
    tank.aimRender,
    tank.gan,
    tank.healthRender,
    ...musRenderGanAndHealth,
    ...musHiddenBlocks
  );
  app.stage.addChild(reelContainer);
}

export { app, start, onAssetsLoaded };

function randomeNumber(x: number) {
  return Math.floor(Math.random() * x);
}

function checkMap(
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
) {
  let wall = false;
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
        wall = true;
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
        wall = true;
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
        wall = true;
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
        wall = true;
      }
    }
  }
  return wall;
}

function ckeateMapBlock(
  arrMap: Array<string>,
  arrCheck: Array<any>,
  numTo: number
) {
  const arr: Array<any> = [];
  for (let i = 0; i < numTo; i += 1) {
    const block = new PIXI.Sprite(
      PIXI.Texture.from(arrMap[randomeNumber(arrMap.length)])
    );
    block.pivot.x = block.width / 2;
    block.pivot.y = block.height / 2;
    block.width = app.screen.height * 0.08;
    block.height = app.screen.height * 0.08;
    block.x = randomeNumber(app.screen.width);
    block.y = randomeNumber(app.screen.height);
    if (block.x > app.screen.width - block.width / 2) {
      block.x -= block.width / 2;
    } else if (block.x < block.width / 2) {
      block.x += block.width / 2;
    }
    if (block.y > app.screen.height - block.height / 2) {
      block.y -= block.height / 2;
    } else if (block.y < block.height / 2) {
      block.y += block.height / 2;
    }
    while (
      arrCheck.some((arr1) =>
        arr1.some((elem: any) => checkMap(block, elem))
      ) ||
      arr.some((blok) => checkMap(blok, block))
    ) {
      block.x = randomeNumber(app.screen.width);
      block.y = randomeNumber(app.screen.height);
      if (block.x > app.screen.width - block.width / 2) {
        block.x -= block.width / 2;
      } else if (block.x < block.width / 2) {
        block.x += block.width / 2;
      }
      if (block.y > app.screen.height - block.height / 2) {
        block.y -= block.height / 2;
      } else if (block.y < block.height / 2) {
        block.y += block.height / 2;
      }
    }
    arr.push(block);
  }
  return arr;
}
