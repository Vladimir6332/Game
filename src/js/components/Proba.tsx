// import { Stage, Sprite } from '@inlet/react-pixi';
// import React from 'react';
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
import breakBlock from '../../assets/images/blocks/break.png';
import hiddenBlock from '../../assets/images/blocks/hidden.png';
import immortalBlock from '../../assets/images/blocks/immortal.png';
import TankPlayer from './TankPlayer';
import TankComputer from './TankComputer';

const app = new PIXI.Application({ backgroundColor: 0xffffff });

const start = () =>
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
      {
        name: 'assets/images/brown/bigBOOM/bullet.png',
        url: brownbulletBigBoom,
      },
      { name: 'assets/images/red/bigBOOM/bullet.png', url: redbulletBigBoom },
      { name: 'assets/images/red/speed/bullet.png', url: redbulletSpeed },
      { name: 'assets/images/red/standart/bullet.png', url: redbulletStandart },
      { name: 'assets/images/red/sniper/bullet.png', url: redbulletSniper },
      { name: 'assets/images/blocks/break.png', url: breakBlock },
      { name: 'assets/images/blocks/hidden.png', url: hiddenBlock },
      { name: 'assets/images/blocks/immortal.png', url: immortalBlock },
    ])
    .load(onAssetsLoaded);

function onAssetsLoaded() {
  const reelContainer = new PIXI.Container();
  const musTankBad: Array<any> = [];
  const musMap: Array<any> = [];
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
    musMap
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
    if (x > app.screen.width - (app.screen.width * 0.1) / 2) {
      x -= (app.screen.width * 0.1) / 2;
    } else if (x < (app.screen.width * 0.1) / 2) {
      x += (app.screen.width * 0.1) / 2;
    }
    if (y > app.screen.height - (app.screen.height * 0.1) / 2) {
      y -= (app.screen.height * 0.1) / 2;
    } else if (y < (app.screen.height * 0.1) / 2) {
      y += (app.screen.height * 0.1) / 2;
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
      musMap
    );
    musTankBad.push(tankBad);
  }
  const arrOptionMap = [
    'assets/images/blocks/break.png',
    'assets/images/blocks/hidden.png',
    'assets/images/blocks/immortal.png',
  ];
  for (let i = 0; i < 10; i += 1) {
    const block = new PIXI.Sprite(
      PIXI.Texture.from(arrOptionMap[randomeNumber(arrOptionMap.length)])
    );
    block.pivot.x = block.width / 2;
    block.pivot.y = block.height / 2;
    block.width = 40;
    block.height = 40;
    const x = randomeNumber(app.screen.width);
    const y = randomeNumber(app.screen.height);
    if (x > app.screen.width - block.width / 2) {
      block.x = x - block.width / 2;
    } else if (x < block.width / 2) {
      block.x = x + block.width / 2;
    } else {
      block.x = x;
    }
    if (y > app.screen.height - block.height / 2) {
      block.y = y - block.height / 2;
    } else if (y < block.height / 2) {
      block.y = y + block.height / 2;
    } else {
      block.y = y;
    }
    musMap.push(block);
  }

  app.view.addEventListener('mousemove', (e) => {
    tank.moveGan(e.offsetX, e.offsetY);
  });

  window.addEventListener('keypress', (e) => {
    tank.moveTank(e.code);
  });

  app.view.addEventListener('click', (e) => {
    tank.shut(e.offsetX, e.offsetY);
  });
  const musRender: Array<any> = [];
  musTankBad.forEach((tankBad) => {
    tankBad.init();
    musRender.push(tankBad.sprite, tankBad.gan, tankBad.healthRender);
  });

  tank.init();
  reelContainer.addChild(
    tank.aimRender,
    tank.sprite,
    tank.gan,
    tank.healthRender,
    ...musRender,
    ...musMap
  );
  app.stage.addChild(reelContainer);
}

export { app, start, onAssetsLoaded };

function randomeNumber(x: number) {
  return Math.floor(Math.random() * x);
}
