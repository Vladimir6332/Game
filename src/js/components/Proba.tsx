// import { Stage, Sprite } from '@inlet/react-pixi';
// import React from 'react';
import * as PIXI from 'pixi.js-legacy';
import tankUrl from '../../assets/images/weapons/red/tank.png';
import tankUrlGood from '../../assets/images/weapons/brown/tank.png';
import gunUrlGood from '../../assets/images/weapons/brown/bigBOOM/bigBOOM.png';
import gunUrl from '../../assets/images/weapons/red/bigBOOM/bigBOOM.png';
import TankPlayer from './TankPlayer';
import TankComputer from './TankComputer';

const app = new PIXI.Application({ backgroundColor: 0xffffff });

app.loader
  .add([
    { name: 'assets/images/red/tank.png', url: tankUrl },
    { name: 'assets/images/red/bigBOOM/bigBOOM.png', url: gunUrl },
    { name: 'assets/images/brown/tank.png', url: tankUrlGood },
    { name: 'assets/images/brown/bigBOOM/bigBOOM.png', url: gunUrlGood },
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
  const tankBad = new (TankComputer as any)(
    app.screen.width,
    app.screen.height,
    'assets/images/red/bigBOOM/bigBOOM.png',
    400,
    500,
    app.screen.width,
    app.screen.height,
    reelContainer,
    tank
  );

  app.view.addEventListener('mousemove', (e) => {
    tank.moveGan(e.offsetX, e.offsetY);
  });

  window.addEventListener('keypress', (e) => {
    tank.moveTank(e.code);
    if (tank.batter(tankBad.sprite)) {
      console.log('Taran');
    }
  });

  app.view.addEventListener('click', (e) => {
    tank.shut(e.offsetX, e.offsetY, tankBad);
  });

  tankBad.init();
  tank.init();
  reelContainer.addChild(
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
