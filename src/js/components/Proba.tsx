// import { Stage, Sprite } from '@inlet/react-pixi';
// import React from 'react';
import * as PIXI from 'pixi.js';
import tankUrl from '../../assets/images/weapons/red/tank.png';
import tankUrlGood from '../../assets/images/weapons/brown/tank.png';
import gunUrlGood from '../../assets/images/weapons/brown/bigBOOM/bigBOOM.png';
import gunUrl from '../../assets/images/weapons/red/bigBOOM/bigBOOM.png';

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
  const tank = {
    sprite: new PIXI.Sprite(PIXI.Texture.from('assets/images/brown/tank.png')),
    health: 600,
    fullHealth: 600,
    aim: 400,
    x: 0,
    y: 0,
    gan: new PIXI.Sprite(
      PIXI.Texture.from('assets/images/brown/bigBOOM/bigBOOM.png')
    ),
    angleX: 0,
    angleY: 0,
  };
  const tankBad = new PIXI.Sprite(
    PIXI.Texture.from('assets/images/red/tank.png')
  );
  const ganBad = new PIXI.Sprite(
    PIXI.Texture.from('assets/images/red/bigBOOM/bigBOOM.png')
  );
  const aim = new PIXI.Graphics();
  aim.lineStyle(4, 0x00ff00, 0.5, 0.5, true);
  const xBadStart = app.screen.width;
  const yBadStart = app.screen.height;
  tankBad.pivot.y = tankBad.height / 2;
  tankBad.pivot.x = tankBad.width / 2;
  tankBad.width = 100;
  tankBad.height = 50;
  tankBad.x = xBadStart - tankBad.width / 2;
  tankBad.y = yBadStart - tankBad.height / 2;
  tankBad.rotation = Math.PI;
  ganBad.y = yBadStart - tankBad.height / 2;
  ganBad.x = xBadStart - tankBad.width / 2;
  ganBad.pivot.y = ganBad.height / 2;
  ganBad.pivot.x = ganBad.width * 0.3;
  ganBad.width *= 0.1;
  ganBad.height *= 0.1;
  ganBad.rotation = Math.PI;
  tank.sprite.y = tank.y;
  tank.sprite.x = tank.x;
  tank.sprite.pivot.y = tank.sprite.height / 2;
  tank.sprite.pivot.x = tank.sprite.width / 2;
  tank.sprite.width = 100;
  tank.sprite.height = 50;
  tank.sprite.y = tank.y + tank.sprite.height / 2;
  tank.sprite.x = tank.x + tank.sprite.width / 2;
  aim.drawCircle(tank.sprite.x, tank.sprite.y, 400);
  tank.gan.y = tank.y + tank.sprite.height / 2;
  tank.gan.x = tank.x + tank.sprite.width / 2;
  tank.gan.pivot.y = tank.gan.height / 2;
  tank.gan.pivot.x = tank.gan.width * 0.3;
  tank.gan.width *= 0.1;
  tank.gan.height *= 0.1;
  app.view.addEventListener('mousemove', (e) => {
    tank.angleX = e.offsetX;
    tank.angleY = e.offsetY;
    tank.gan.rotation = anglee(tank.x, tank.y, tank.angleX, tank.angleY);
  });
  window.addEventListener('keypress', (e) => {
    if (e.code === 'KeyW') {
      if (tank.y < tank.sprite.height) {
        return;
      }
      tank.sprite.rotation = Math.PI / 2;
      tank.y -= 10;
    } else if (e.code === 'KeyS') {
      if (tank.sprite.y > app.view.height) {
        return;
      }
      tank.sprite.rotation = (Math.PI * 3) / 2;
      tank.y += 10;
    } else if (e.code === 'KeyA') {
      if (tank.x < 0) {
        return;
      }
      tank.sprite.rotation = Math.PI;
      tank.x -= 10;
    } else if (e.code === 'KeyD') {
      if (tank.x > app.view.width) {
        return;
      }
      tank.sprite.rotation = 0;
      tank.x += 10;
    } else {
      return;
    }
    aim.clear();
    tank.sprite.y = tank.y + tank.sprite.height / 2;
    tank.sprite.x = tank.x + tank.sprite.width / 2;
    tank.gan.y = tank.y + tank.sprite.height / 2;
    tank.gan.x = tank.x + tank.sprite.width / 2;
    aim.lineStyle(4, 0x00ff00, 0.5, 0.5, true);
    aim.drawCircle(tank.sprite.x, tank.sprite.y, 400);
    if (hitTank(tank.sprite, tankBad)) {
      console.log('Taran');
    }
    if (tank.angleY !== 0 && tank.angleX !== 0) {
      tank.gan.rotation = anglee(
        tank.sprite.x,
        tank.sprite.y,
        tank.angleX,
        tank.angleY
      );
    }
  });

  app.view.addEventListener('click', (e) => {
    const mx = e.offsetX;
    const my = e.offsetY;
    const dy = createNaprv(mx, my, tank.x, tank.y);
    const dx = Math.sin(anglee(tank.x, tank.y, mx, my) + Math.PI / 2) * 10;
    let startX = tank.x + (dx * tank.gan.width * 0.7) / 10;
    let startY =
      tank.y -
      Math.cos(anglee(tank.x, tank.y, mx, my) + Math.PI / 2) *
        tank.gan.width *
        0.7;
    const r = new PIXI.Graphics();
    function paint() {
      r.clear();
      r.beginFill(0x000000, 1);
      r.drawCircle(startX, startY, 2);
      if (hitBill(tankBad, startX, startY)) {
        r.clear();
        reelContainer.removeChild(r);
        console.log('BOOOM!');
        findAss();
        return;
      }
      startX += dx;
      startY = dy(startX);
      if (
        startY > app.screen.height ||
        startX > app.screen.width ||
        startY < 0 ||
        startX < 0
      ) {
        r.clear();
        reelContainer.removeChild(r);
        return;
      }
      setTimeout(paint, 17);
    }
    reelContainer.addChild(r);
    setTimeout(paint, 0);
  });

  let count = 0;
  function computer() {
    if (tankBad.rotation === 0) {
      tankBad.x += 5;
      ganBad.x += 5;
    } else if (tankBad.rotation === Math.PI) {
      tankBad.x -= 5;
      ganBad.x -= 5;
    } else if (tankBad.rotation === (3 * Math.PI) / 2) {
      tankBad.y -= 5;
      ganBad.y -= 5;
    } else {
      tankBad.y += 5;
      ganBad.y += 5;
    }
    count += 1;
    if (count === 50) {
      count = 0;
      tankBad.rotation += Math.PI / 2;
      ganBad.rotation += Math.PI / 2;
      if (tankBad.rotation === Math.PI * 2) {
        tankBad.rotation = 0;
        ganBad.rotation = 0;
      }
    }
    if (checkLenght(tank, tankBad)) {
      findAss();
      return;
    }
    setTimeout(computer, 50);
  }
  let stepBad = 0;
  let naprv = false;
  function findAss() {
    const dx = tank.x - tankBad.x;
    const dy = tank.y - tankBad.y;
    if (stepBad <= 0) {
      naprv = Math.abs(dx) > Math.abs(dy);
      stepBad = naprv ? Math.abs(dx) / 2 : Math.abs(dy) / 2;
    }
    if (naprv) {
      if (dx > 0) {
        tankBad.x += 7;
        tankBad.rotation = 0;
        ganBad.x += 7;
        ganBad.rotation = 0;
      } else {
        tankBad.x -= 7;
        tankBad.rotation = Math.PI;
        ganBad.x -= 7;
        ganBad.rotation = Math.PI;
      }
    } else if (!naprv) {
      if (dy > 0) {
        tankBad.y += 7;
        tankBad.rotation = Math.PI / 2;
        ganBad.y += 7;
        ganBad.rotation = Math.PI / 2;
      } else {
        tankBad.y -= 7;
        tankBad.rotation = (Math.PI * 3) / 2;
        ganBad.y -= 7;
        ganBad.rotation = (Math.PI * 3) / 2;
      }
    }
    stepBad -= 7;
    if (!hitTank(tankBad, tank.sprite)) {
      console.log('Тоби пизда!');
      setTimeout(findAss, 50);
    } else {
      console.log('You were checked! LOL!');
    }
  }
  computer();
  reelContainer.addChild(aim, tank.sprite, tank.gan, tankBad, ganBad);
  app.stage.addChild(reelContainer);
}

export default app;

function anglee(x1: number, y1: number, x2: number, y2: number) {
  let angle = Math.atan((y1 - y2) / (x1 - x2));
  if (x1 > x2) {
    angle = Math.atan((y1 - y2) / (x1 - x2)) + Math.PI;
  }
  return angle;
}

function createNaprv(x: number, y: number, x1: number, y1: number) {
  const b = (y * x1 - y1 * x) / (x1 - x);
  const a = (y1 - b) / x1;
  return function (n: number) {
    return n * a + b;
  };
}

function hitBill(
  r1: { x: number; y: number; width: number; height: number; rotation: number },
  x1: number,
  y1: number
) {
  let hit = false;
  const angle = r1.rotation;
  if (angle % Math.PI === 0) {
    if (
      x1 >= r1.x - r1.width / 2 &&
      x1 <= r1.x + r1.width / 2 &&
      y1 >= r1.y - r1.height / 2 &&
      y1 <= r1.y + r1.height / 2
    ) {
      hit = true;
    } else {
      hit = false;
    }
  } else if (angle % Math.PI !== 0) {
    if (
      x1 >= r1.x - r1.height / 2 &&
      x1 <= r1.x + r1.height / 2 &&
      y1 >= r1.y - r1.width / 2 &&
      y1 <= r1.y + r1.width / 2
    ) {
      hit = true;
    } else {
      hit = false;
    }
  }
  return hit;
}

function hitTank(
  r1: { x: number; y: number; width: number; height: number; rotation: number },
  r2: { x: number; y: number; width: number; height: number; rotation: number }
) {
  let hit = false;
  if (r1.rotation % Math.PI === 0 && r2.rotation % Math.PI === 0) {
    if (
      (r2.x - r2.width / 2 >= r1.x - r1.width / 2 &&
        r2.x - r2.width / 2 <= r1.x + r1.width / 2 &&
        r2.y - r2.height / 2 >= r1.y - r1.height / 2 &&
        r2.y - r2.height / 2 <= r1.y + r1.height / 2) ||
      (r2.x - r2.width / 2 >= r1.x - r1.width / 2 &&
        r2.x - r2.width / 2 <= r1.x + r1.width / 2 &&
        r2.y + r2.height / 2 >= r1.y - r1.height / 2 &&
        r2.y + r2.height / 2 <= r1.y + r1.height / 2) ||
      (r2.x + r2.width / 2 >= r1.x - r1.width / 2 &&
        r2.x + r2.width / 2 <= r1.x + r1.width / 2 &&
        r2.y - r2.height / 2 >= r1.y - r1.height / 2 &&
        r2.y - r2.height / 2 <= r1.y + r1.height / 2) ||
      (r2.x + r2.width / 2 >= r1.x - r1.width / 2 &&
        r2.x + r2.width / 2 <= r1.x + r1.width / 2 &&
        r2.y + r2.height / 2 >= r1.y - r1.height / 2 &&
        r2.y + r2.height / 2 <= r1.y + r1.height / 2)
    ) {
      hit = true;
    } else {
      hit = false;
    }
  } else if (r1.rotation % Math.PI !== 0 && r2.rotation % Math.PI === 0) {
    if (
      (r2.x - r2.height / 2 >= r1.x - r1.width / 2 &&
        r2.x - r2.height / 2 <= r1.x + r1.width / 2 &&
        r2.y - r2.width / 2 >= r1.y - r1.height / 2 &&
        r2.y - r2.width / 2 <= r1.y + r1.height / 2) ||
      (r2.x - r2.height / 2 >= r1.x - r1.width / 2 &&
        r2.x - r2.height / 2 <= r1.x + r1.width / 2 &&
        r2.y + r2.width / 2 >= r1.y - r1.height / 2 &&
        r2.y + r2.width / 2 <= r1.y + r1.height / 2) ||
      (r2.x + r2.height / 2 >= r1.x - r1.width / 2 &&
        r2.x + r2.height / 2 <= r1.x + r1.width / 2 &&
        r2.y - r2.width / 2 >= r1.y - r1.height / 2 &&
        r2.y - r2.width / 2 <= r1.y + r1.height / 2) ||
      (r2.x + r2.height / 2 >= r1.x - r1.width / 2 &&
        r2.x + r2.height / 2 <= r1.x + r1.width / 2 &&
        r2.y + r2.width / 2 >= r1.y - r1.height / 2 &&
        r2.y + r2.width / 2 <= r1.y + r1.height / 2)
    ) {
      hit = true;
    } else {
      hit = false;
    }
  } else if (r1.rotation % Math.PI === 0 && r2.rotation % Math.PI !== 0) {
    if (
      (r2.x - r2.width / 2 >= r1.x - r1.height / 2 &&
        r2.x - r2.width / 2 <= r1.x + r1.height / 2 &&
        r2.y - r2.height / 2 >= r1.y - r1.width / 2 &&
        r2.y - r2.height / 2 <= r1.y + r1.width / 2) ||
      (r2.x - r2.width / 2 >= r1.x - r1.height / 2 &&
        r2.x - r2.width / 2 <= r1.x + r1.height / 2 &&
        r2.y + r2.height / 2 >= r1.y - r1.width / 2 &&
        r2.y + r2.height / 2 <= r1.y + r1.width / 2) ||
      (r2.x + r2.width / 2 >= r1.x - r1.height / 2 &&
        r2.x + r2.width / 2 <= r1.x + r1.height / 2 &&
        r2.y - r2.height / 2 >= r1.y - r1.width / 2 &&
        r2.y - r2.height / 2 <= r1.y + r1.width / 2) ||
      (r2.x + r2.width / 2 >= r1.x - r1.height / 2 &&
        r2.x + r2.width / 2 <= r1.x + r1.height / 2 &&
        r2.y + r2.height / 2 >= r1.y - r1.width / 2 &&
        r2.y + r2.height / 2 <= r1.y + r1.width / 2)
    ) {
      hit = true;
    } else {
      hit = false;
    }
  } else if (r1.rotation % Math.PI !== 0 && r2.rotation % Math.PI !== 0) {
    if (
      (r2.x - r2.height / 2 >= r1.x - r1.height / 2 &&
        r2.x - r2.height / 2 <= r1.x + r1.height / 2 &&
        r2.y - r2.width / 2 >= r1.y - r1.width / 2 &&
        r2.y - r2.width / 2 <= r1.y + r1.width / 2) ||
      (r2.x - r2.height / 2 >= r1.x - r1.height / 2 &&
        r2.x - r2.height / 2 <= r1.x + r1.height / 2 &&
        r2.y + r2.width / 2 >= r1.y - r1.width / 2 &&
        r2.y + r2.width / 2 <= r1.y + r1.width / 2) ||
      (r2.x + r2.height / 2 >= r1.x - r1.height / 2 &&
        r2.x + r2.height / 2 <= r1.x + r1.height / 2 &&
        r2.y - r2.width / 2 >= r1.y - r1.width / 2 &&
        r2.y - r2.width / 2 <= r1.y + r1.width / 2) ||
      (r2.x + r2.height / 2 >= r1.x - r1.height / 2 &&
        r2.x + r2.height / 2 <= r1.x + r1.height / 2 &&
        r2.y + r2.width / 2 >= r1.y - r1.width / 2 &&
        r2.y + r2.width / 2 <= r1.y + r1.width / 2)
    ) {
      hit = true;
    } else {
      hit = false;
    }
  }
  return hit;
}

function checkLenght(
  tank: { x: number; y: number },
  tank2: { x: number; y: number }
) {
  return Math.sqrt((tank.x - tank2.x) ** 2 + (tank.y - tank2.y) ** 2) < 400;
}
