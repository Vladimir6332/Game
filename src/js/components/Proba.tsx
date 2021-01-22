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
    { name: 'assets/images/blocks/break.png', url: breakBlock },
    { name: 'assets/images/blocks/hidden.png', url: hiddenBlock },
    { name: 'assets/images/blocks/immortal.png', url: immortalBlock },
  ])
  .load(onAssetsLoaded);

function onAssetsLoaded() {
  const reelContainer = new PIXI.Container();
  const tank = new (TankPlayer as any)(
    0,
    app.screen.height / 2,
    'assets/images/brown/bigBOOM/bigBOOM.png',
    400,
    500,
    app.screen.width,
    app.screen.height,
    reelContainer
  );
  const musMap: Array<any> = [];
  const tankBad = new (TankComputer as any)(
    app.screen.width,
    app.screen.height,
    'assets/images/red/bigBOOM/bigBOOM.png',
    400,
    500,
    app.screen.width,
    app.screen.height,
    reelContainer,
    tank,
    musMap
  );
  const first = new PIXI.Graphics();
  const second = new PIXI.Graphics();
  const trird = new PIXI.Graphics();
  musMap.push(first, second, trird);
  musMap.forEach((map: any, index: number) => {
    const clonMap = map;
    clonMap.beginFill(0x000000, 1);
    const x1 = app.screen.width - 50 * (index + 1);
    const y1 = app.screen.height - 100 * (index + 1);
    clonMap.x = x1;
    clonMap.y = y1;
    clonMap.drawRect(0, 0, 10, 10);
  });

  app.view.addEventListener('mousemove', (e) => {
    tank.moveGan(e.offsetX, e.offsetY);
  });

  window.addEventListener('keypress', (e) => {
    tank.moveTank(e.code);
    if (tank.batter(tankBad.sprite)) {
      console.log(tankBad.health);
    }
  });

  app.view.addEventListener('click', (e) => {
    tank.shut(e.offsetX, e.offsetY, tankBad);
  });

  tankBad.init();
  tank.init();
  reelContainer.addChild(
    ...musMap,
    tank.aimRender,
    tank.sprite,
    tank.gan,
    tankBad.sprite,
    tankBad.gan,
    tankBad.healthRender,
    tank.healthRender
  );
  app.stage.addChild(reelContainer);
}

export default app;
