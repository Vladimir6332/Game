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
    recharge: false,
    timeRecharge: 500,
  };
  const tankBad = {
    sprite: new PIXI.Sprite(PIXI.Texture.from('assets/images/red/tank.png')),
    health: 600,
    fullHealth: 600,
    aim: 400,
    x: app.screen.width,
    y: app.screen.height,
    ganBad: new PIXI.Sprite(
      PIXI.Texture.from('assets/images/red/bigBOOM/bigBOOM.png')
    ),
    angleX: 0,
    angleY: 0,
    stepBad: 0,
    checkAss: false,
    naprv: false,
    dead: false,
    recharge: false,
    timeRecharge: 500,
    count: 0,
  };
  const aim = new PIXI.Graphics();
  const health = new PIXI.Graphics();
  const healthBad = new PIXI.Graphics();
  health.lineStyle(4, 0x000000, 1, 0.5, true);
  healthBad.lineStyle(4, 0x000000, 1, 0.5, true);
  aim.lineStyle(4, 0x00ff00, 0.5, 0.5, true);
  tankBad.sprite.pivot.y = tankBad.sprite.height / 2;
  tankBad.sprite.pivot.x = tankBad.sprite.width / 2;
  tankBad.sprite.width = 100;
  tankBad.sprite.height = 50;
  tankBad.sprite.x = tankBad.x - tankBad.sprite.width / 2;
  tankBad.sprite.y = tankBad.y - tankBad.sprite.height / 2;
  tankBad.sprite.rotation = Math.PI;
  tankBad.ganBad.y = tankBad.y - tankBad.sprite.height / 2;
  tankBad.ganBad.x = tankBad.x - tankBad.sprite.width / 2;
  tankBad.ganBad.pivot.y = tankBad.ganBad.height / 2;
  tankBad.ganBad.pivot.x = tankBad.ganBad.width * 0.3;
  tankBad.ganBad.width *= 0.1;
  tankBad.ganBad.height *= 0.1;
  tankBad.ganBad.rotation = Math.PI;
  healthBad.drawRect(
    tankBad.sprite.x - tankBad.sprite.width / 2,
    tankBad.sprite.y - tankBad.sprite.height / 2 - 20,
    100,
    4
  );
  healthBad.beginFill(0x00ff00, 1);
  healthBad.drawRect(
    tankBad.sprite.x - tankBad.sprite.width / 2,
    tankBad.sprite.y - tankBad.sprite.height / 2 - 20,
    100,
    4
  );
  healthBad.endFill();
  tank.sprite.y = tank.y;
  tank.sprite.x = tank.x;
  tank.sprite.pivot.y = tank.sprite.height / 2;
  tank.sprite.pivot.x = tank.sprite.width / 2;
  tank.sprite.width = 100;
  tank.sprite.height = 50;
  tank.sprite.y = tank.y + tank.sprite.height / 2;
  tank.sprite.x = tank.x + tank.sprite.width / 2;
  aim.drawCircle(tank.sprite.x, tank.sprite.y, tank.aim);
  tank.gan.y = tank.y + tank.sprite.height / 2;
  tank.gan.x = tank.x + tank.sprite.width / 2;
  tank.gan.pivot.y = tank.gan.height / 2;
  tank.gan.pivot.x = tank.gan.width * 0.3;
  tank.gan.width *= 0.1;
  tank.gan.height *= 0.1;
  health.drawRect(
    tank.sprite.x - tank.sprite.width / 2,
    tank.sprite.y - tank.sprite.height / 2 - 20,
    100,
    4
  );
  health.beginFill(0x00ff00, 1);
  health.drawRect(
    tank.sprite.x - tank.sprite.width / 2,
    tank.sprite.y - tank.sprite.height / 2 - 20,
    100,
    4
  );
  health.endFill();
  app.view.addEventListener('mousemove', (e) => {
    tank.angleX = e.offsetX;
    tank.angleY = e.offsetY;
    tank.gan.rotation = anglee(
      tank.sprite.x,
      tank.sprite.y,
      tank.angleX,
      tank.angleY
    );
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
    aim.drawCircle(tank.sprite.x, tank.sprite.y, tank.aim);
    health.clear();
    health.lineStyle(4, 0x000000, 1, 0.5, true);
    health.drawRect(
      tank.sprite.x - tank.sprite.width / 2,
      tank.sprite.y - tank.sprite.height / 2 - 20,
      100,
      4
    );
    if (tank.health / tank.fullHealth < 0.3) {
      health.beginFill(0xff0000, 1);
    } else if (tank.health / tank.fullHealth < 0.6) {
      health.beginFill(0xffff00, 1);
    } else {
      health.beginFill(0x00ff00, 1);
    }
    health.drawRect(
      tank.sprite.x - tank.sprite.width / 2,
      tank.sprite.y - tank.sprite.height / 2 - 20,
      (100 * tank.health) / tank.fullHealth,
      4
    );
    if (hitTank(tank.sprite, tankBad.sprite)) {
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
    if (tank.recharge) return;
    tank.recharge = true;
    setTimeout(() => {
      tank.recharge = false;
    }, tank.timeRecharge);
    const mx = e.offsetX;
    const my = e.offsetY;
    const dy = createNaprv(mx, my, tank.sprite.x, tank.sprite.y);
    const dx =
      Math.sin(anglee(tank.sprite.x, tank.sprite.y, mx, my) + Math.PI / 2) * 10;
    let startX = tank.sprite.x + (dx * tank.gan.width * 0.7) / 10;
    let startY =
      tank.sprite.y -
      Math.cos(anglee(tank.sprite.x, tank.sprite.y, mx, my) + Math.PI / 2) *
        tank.gan.width *
        0.7;
    const r = new PIXI.Graphics();
    let final = tank.aim - tank.gan.width * 0.7;
    function paint() {
      r.clear();
      r.beginFill(0x000000, 1);
      r.drawCircle(startX, startY, 2);
      if (hitBill(tankBad.sprite, startX, startY)) {
        r.clear();
        reelContainer.removeChild(r);
        console.log('BOOOM!');
        tankBad.health -= 100;
        if (tankBad.health <= 0) {
          tankBad.dead = true;
        }
        if (!tankBad.checkAss) {
          tankBad.checkAss = true;
          findAss();
        }
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
      if (final <= 0) {
        r.clear();
        reelContainer.removeChild(r);
        return;
      }
      final -= 10;
      setTimeout(paint, 17);
    }
    reelContainer.addChild(r);
    setTimeout(paint, 0);
  });

  function computer() {
    if (tankBad.checkAss || tankBad.dead) return;
    if (tankBad.sprite.rotation === 0) {
      tankBad.sprite.x += 5;
      tankBad.ganBad.x += 5;
    } else if (tankBad.sprite.rotation === Math.PI) {
      tankBad.sprite.x -= 5;
      tankBad.ganBad.x -= 5;
    } else if (tankBad.sprite.rotation === (3 * Math.PI) / 2) {
      tankBad.sprite.y -= 5;
      tankBad.ganBad.y -= 5;
    } else {
      tankBad.sprite.y += 5;
      tankBad.ganBad.y += 5;
    }
    tankBad.count += 1;
    if (tankBad.count === 50) {
      tankBad.count = 0;
      tankBad.sprite.rotation += Math.PI / 2;
      tankBad.ganBad.rotation += Math.PI / 2;
      if (tankBad.sprite.rotation === Math.PI * 2) {
        tankBad.sprite.rotation = 0;
        tankBad.ganBad.rotation = 0;
      }
    }
    healthBad.clear();
    healthBad.lineStyle(4, 0x000000, 1, 0.5, true);
    healthBad.drawRect(
      tankBad.sprite.x - tankBad.sprite.width / 2,
      tankBad.sprite.y - tankBad.sprite.height / 2 - 20,
      100,
      4
    );
    if (tankBad.health / tankBad.fullHealth < 0.3) {
      healthBad.beginFill(0xff0000, 1);
    } else if (tankBad.health / tankBad.fullHealth < 0.6) {
      healthBad.beginFill(0xffff00, 1);
    } else {
      healthBad.beginFill(0x00ff00, 1);
    }
    healthBad.drawRect(
      tankBad.sprite.x - tankBad.sprite.width / 2,
      tankBad.sprite.y - tankBad.sprite.height / 2 - 20,
      (100 * tankBad.health) / tankBad.fullHealth,
      4
    );
    if (checkLenght(tank.sprite, tankBad.sprite)) {
      tankBad.checkAss = true;
      findAss();
      return;
    }
    setTimeout(computer, 50);
  }
  function findAss() {
    if (tankBad.dead) {
      reelContainer.removeChild(tankBad.sprite, tankBad.ganBad, healthBad);
      return;
    }
    const dx = tank.sprite.x - tankBad.sprite.x;
    const dy = tank.sprite.y - tankBad.sprite.y;
    if (tankBad.stepBad <= 0) {
      tankBad.naprv = Math.abs(dx) > Math.abs(dy);
      tankBad.stepBad = tankBad.naprv ? Math.abs(dx) / 2 : Math.abs(dy) / 2;
    }
    if (tankBad.naprv) {
      if (dx > 0) {
        tankBad.sprite.x += 7;
        tankBad.sprite.rotation = 0;
        tankBad.ganBad.x += 7;
        tankBad.ganBad.rotation = 0;
      } else {
        tankBad.sprite.x -= 7;
        tankBad.sprite.rotation = Math.PI;
        tankBad.ganBad.x -= 7;
        tankBad.ganBad.rotation = Math.PI;
      }
    } else if (!tankBad.naprv) {
      if (dy > 0) {
        tankBad.sprite.y += 7;
        tankBad.sprite.rotation = Math.PI / 2;
        tankBad.ganBad.y += 7;
        tankBad.ganBad.rotation = Math.PI / 2;
      } else {
        tankBad.sprite.y -= 7;
        tankBad.sprite.rotation = (Math.PI * 3) / 2;
        tankBad.ganBad.y -= 7;
        tankBad.ganBad.rotation = (Math.PI * 3) / 2;
      }
    }
    tankBad.stepBad -= 7;
    healthBad.clear();
    healthBad.lineStyle(4, 0x000000, 1, 0.5, true);
    healthBad.drawRect(
      tankBad.sprite.x - tankBad.sprite.width / 2,
      tankBad.sprite.y - tankBad.sprite.height / 2 - 20,
      100,
      4
    );
    if (tankBad.health / tankBad.fullHealth < 0.3) {
      healthBad.beginFill(0xff0000, 1);
    } else if (tankBad.health / tankBad.fullHealth < 0.6) {
      healthBad.beginFill(0xffff00, 1);
    } else {
      healthBad.beginFill(0x00ff00, 1);
    }
    healthBad.drawRect(
      tankBad.sprite.x - tankBad.sprite.width / 2,
      tankBad.sprite.y - tankBad.sprite.height / 2 - 20,
      (100 * tankBad.health) / tankBad.fullHealth,
      4
    );
    if (!hitTank(tankBad.sprite, tank.sprite)) {
      console.log('Тоби пизда!');
      setTimeout(findAss, 50);
    } else {
      console.log('You were checked! LOL!');
    }
  }
  computer();
  reelContainer.addChild(
    aim,
    tank.sprite,
    tank.gan,
    tankBad.sprite,
    tankBad.ganBad,
    health,
    healthBad
  );
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
