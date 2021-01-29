import * as PIXI from 'pixi.js-legacy';
import { TankPl, TankUnit } from '../custom_typings/Tanks.d';

const TankPlayer: TankPl = function TankPlayer(
  this: any,
  x,
  y,
  gan,
  aim,
  timeCallDown,
  speadBullet,
  damage,
  appWidth,
  appHeigth,
  conteiner,
  evil,
  musImmortalBlocks,
  musBreakBlocks
): void {
  this.x = x;
  this.y = y;
  this.sprite = new PIXI.Sprite(
    PIXI.Texture.from('assets/images/brown/tank.png')
  );
  this.gan = new PIXI.Sprite(PIXI.Texture.from(gan));
  this.bullet = `${gan
    .split('/')
    .slice(0, gan.split('/').length - 1)
    .join('/')}/bullet.png`;
  this.healthRender = new PIXI.Graphics();
  this.aimRender = new PIXI.Graphics();
  this.health = 200;
  this.fullHealth = 200;
  this.aim = aim;
  this.speadBullet = speadBullet;
  this.damage = damage;
  this.angleX = 0;
  this.angleY = 0;
  this.callDown = false;
  this.timeCallDown = timeCallDown;
  this.angleGan = 0;
  this.appHeigth = appHeigth;
  this.appWidth = appWidth;
  this.conteiner = conteiner;
  this.checkDead = false;
  this.time = 0;
  this.arrEvil = evil;
  this.musBreakBlocks = musBreakBlocks;
  this.musImmortalBlocks = musImmortalBlocks;
  this.checkPause = false;
  this.arrTimeShut = [];

  this.init = () => {
    this.renderStart();
    this.renderGan();
    this.time = setInterval(this.render, 17);
  };
  this.renderStart = () => {
    this.aimRender.clear();
    this.healthRender.clear();
    const dWidth = this.gan.width / this.sprite.width;
    const dHeight = this.gan.height / this.sprite.height;
    this.sprite.pivot.y = this.sprite.height / 2;
    this.sprite.pivot.x = this.sprite.width / 2;
    this.sprite.width = this.appWidth * 0.1;
    this.sprite.height = this.sprite.width / 2;
    this.sprite.y = this.y + this.sprite.height / 2;
    this.sprite.x = this.x + this.sprite.width / 2;
    this.aimRender.lineStyle(4, 0x00ff00, 1, 0.5, true);
    this.aimRender.drawCircle(this.sprite.x, this.sprite.y, this.aim);
    this.gan.y = this.y + this.sprite.height / 2;
    this.gan.x = this.x + this.sprite.width / 2;
    this.gan.pivot.y = this.gan.height / 2;
    this.gan.pivot.x = this.gan.width * 0.353;
    this.gan.width = dWidth * this.sprite.width;
    this.gan.height = dHeight * this.sprite.height;
    this.gan.rotation = this.angleGan;
    this.healthRender.lineStyle(4, 0x000000, 1, 0.5, true);
    this.healthRender.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 - 20,
      this.sprite.width,
      4
    );
    this.healthRender.endFill();
    if (this.health / this.fullHealth < 0.3) {
      this.healthRender.beginFill(0xff0000, 1);
    } else if (this.health / this.fullHealth < 0.6) {
      this.healthRender.beginFill(0xffff00, 1);
    } else {
      this.healthRender.beginFill(0x00ff00, 1);
    }
    this.healthRender.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 - 20,
      (this.sprite.width * this.health) / this.fullHealth,
      4
    );
    this.healthRender.endFill();
  };
  this.renderGan = () => {
    if (this.angleX !== 0 && this.angleY !== 0) {
      this.angleGan = anglee(this.gan.x, this.gan.y, this.angleX, this.angleY);
    }
    this.gan.y = this.sprite.y;
    this.gan.x = this.sprite.x;
    this.gan.rotation = this.angleGan;
  };
  this.render = () => {
    this.aimRender.clear();
    this.healthRender.clear();
    this.aimRender.lineStyle(4, 0x00ff00, 1, 0.5, true);
    this.aimRender.drawCircle(this.sprite.x, this.sprite.y, this.aim);
    this.healthRender.lineStyle(4, 0x000000, 1, 0.5, true);
    this.healthRender.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 - 20,
      this.sprite.width,
      4
    );
    this.healthRender.endFill();
    if (this.health / this.fullHealth < 0.3) {
      this.healthRender.beginFill(0xff0000, 1);
    } else if (this.health / this.fullHealth < 0.6) {
      this.healthRender.beginFill(0xffff00, 1);
    } else {
      this.healthRender.beginFill(0x00ff00, 1);
    }
    this.healthRender.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 - 20,
      (this.sprite.width * this.health) / this.fullHealth,
      4
    );
    this.healthRender.endFill();
    if (this.health <= 0) {
      this.dead();
    }
    this.renderGan();
  };
  this.moveTank = (keyCode: string) => {
    if (this.checkDead) return;
    if (keyCode === 'KeyW') {
      if (this.sprite.y < this.sprite.width / 2 + 10) return;
      this.sprite.rotation = (Math.PI * 3) / 2;
      this.sprite.y -= 10;
      if (this.turn()) {
        this.sprite.y += 10;
      }
    } else if (keyCode === 'KeyS') {
      if (this.sprite.y > appHeigth - this.sprite.width / 2 - 10) return;
      this.sprite.rotation = Math.PI / 2;
      this.sprite.y += 10;
      if (this.turn()) {
        this.sprite.y -= 10;
      }
    } else if (keyCode === 'KeyA') {
      if (this.sprite.x < this.sprite.width / 2 + 10) return;
      this.sprite.rotation = Math.PI;
      this.sprite.x -= 10;
      if (this.turn()) {
        this.sprite.x += 10;
      }
    } else if (keyCode === 'KeyD') {
      if (this.sprite.x > appWidth - this.sprite.width / 2 - 10) return;
      this.sprite.rotation = 0;
      this.sprite.x += 10;
      if (this.turn()) {
        this.sprite.x -= 10;
      }
    }
  };
  this.batter = (r: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    health: number;
  }) => {
    let checkBatter = false;
    const r1 = this.sprite;
    const r2 = r;
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
        checkBatter = true;
      } else {
        checkBatter = false;
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
        checkBatter = true;
      } else {
        checkBatter = false;
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
        checkBatter = true;
      } else {
        checkBatter = false;
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
        checkBatter = true;
      } else {
        checkBatter = false;
      }
    }
    return checkBatter;
  };
  this.moveGan = (offsetX: number, offsetY: number) => {
    if (this.checkPause) return;
    this.angleX = offsetX;
    this.angleY = offsetY;
    this.renderGan();
  };
  this.shut = (posX: number, posY: number) => {
    if (this.callDown || this.checkDead || this.checkPause) return;
    this.callDown = true;
    setTimeout(() => {
      this.callDown = false;
    }, this.timeCallDown);
    const mx = posX;
    const my = posY;
    const clonConteiner = this.conteiner;
    const clonArrEvil = this.arrEvil;
    const clonMusBreakBlocks = this.musBreakBlocks;
    const clonmusImmortalBlocks = this.musImmortalBlocks;
    const dy = createNaprv(mx, my, this.sprite.x, this.sprite.y);
    const dx =
      Math.sin(anglee(this.sprite.x, this.sprite.y, mx, my) + Math.PI / 2) *
      this.speadBullet;
    let startX = this.sprite.x + (dx * this.gan.width * 0.647) / 10;
    let startY =
      this.sprite.y -
      Math.cos(anglee(this.sprite.x, this.sprite.y, mx, my) + Math.PI / 2) *
        this.gan.width *
        0.7;
    const r = new PIXI.Sprite(PIXI.Texture.from(this.bullet));
    let final = this.aim - this.gan.width * 0.8;
    r.pivot.x = r.width / 2;
    r.pivot.y = r.height / 2;
    const { width } = r;
    r.width = 30;
    r.height *= r.width / width;
    r.rotation = anglee(this.sprite.x, this.sprite.y, mx, my);
    const timeShut = setInterval(() => paint.call(this), 17);
    this.arrTimeShut.push(timeShut);
    function paint() {
      if (clonArrEvil[0].player.checkPause) return;
      r.x = startX;
      r.y = startY;
      clonMusBreakBlocks.forEach((block: PIXI.Sprite, index: number) => {
        if (hitBill(block, startX, startY)) {
          clonConteiner.removeChild(block);
          clonMusBreakBlocks.splice(index, 1);
          clonConteiner.removeChild(r);
          clearInterval(timeShut);
          this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
        }
      });
      clonmusImmortalBlocks.forEach((block: PIXI.Sprite) => {
        if (hitBill(block, startX, startY)) {
          clonConteiner.removeChild(r);
          clearInterval(timeShut);
          this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
        }
      });
      clonArrEvil.forEach((tankBund: TankUnit, index: number) => {
        if (hitBill(tankBund.sprite, startX, startY)) {
          const tank = tankBund;
          tank.health -= this.damage;
          clonConteiner.removeChild(r);
          if (!tank.checkFind) {
            tank.checkFind = true;
            clearInterval(tank.time);
            tank.time = setInterval(tank.findPlayer, 50);
          }
          clearInterval(timeShut);
          this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
        }
      });
      startX += dx;
      startY = dy(startX);
      if (
        startY > this.appHeigth ||
        startX > this.appWidth ||
        startY < 0 ||
        startX < 0
      ) {
        clonConteiner.removeChild(r);
        clearInterval(timeShut);
        this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
      }
      if (final <= 0) {
        clonConteiner.removeChild(r);
        clearInterval(timeShut);
        this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
      }
      final -= this.speadBullet;
    }
    clonConteiner.addChild(r);
  };
  this.dead = () => {
    clearInterval(this.time);
    this.conteiner.removeChild(
      this.sprite,
      this.gan,
      this.aimRender,
      this.healthRender
    );
    this.checkDead = true;
  };
  this.turn = () => {
    let result = false;
    if (
      this.musImmortalBlocks.some((mapI: PIXI.Sprite) =>
        this.checkWall(mapI)
      ) ||
      this.musBreakBlocks.some((mapI: PIXI.Sprite) => this.checkWall(mapI))
    ) {
      result = true;
    }
    return result;
  };
  this.checkWall = (wall2: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    let wall = false;
    const width = wall2.width < this.sprite.height;
    const widthSprite = this.sprite.width / 2;
    const heightSprite = this.sprite.height / 2;
    if (this.sprite.rotation % Math.PI === 0) {
      if (width) {
        if (
          (wall2.x - wall2.width / 2 >= this.sprite.x - widthSprite &&
            wall2.x - wall2.width / 2 <= this.sprite.x + widthSprite &&
            wall2.y - wall2.height / 2 >= this.sprite.y - heightSprite &&
            wall2.y - wall2.height / 2 <= this.sprite.y + heightSprite) ||
          (wall2.x - wall2.width / 2 >= this.sprite.x - widthSprite &&
            wall2.x - wall2.width / 2 <= this.sprite.x + widthSprite &&
            wall2.y + wall2.height / 2 >= this.sprite.y - heightSprite &&
            wall2.y + wall2.height / 2 <= this.sprite.y + heightSprite) ||
          (wall2.x + wall2.width / 2 >= this.sprite.x - widthSprite &&
            wall2.x + wall2.width / 2 <= this.sprite.x + widthSprite &&
            wall2.y - wall2.height / 2 >= this.sprite.y - heightSprite &&
            wall2.y - wall2.height / 2 <= this.sprite.y + heightSprite) ||
          (wall2.x + wall2.width / 2 >= this.sprite.x - widthSprite &&
            wall2.x + wall2.width / 2 <= this.sprite.x + widthSprite &&
            wall2.y + wall2.height / 2 >= this.sprite.y - heightSprite &&
            wall2.y + wall2.height / 2 <= this.sprite.y + heightSprite)
        ) {
          wall = true;
        }
      } else if (!width) {
        if (
          (this.sprite.x - widthSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x - widthSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y - heightSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y - heightSprite <= wall2.y + wall2.height / 2) ||
          (this.sprite.x + widthSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x + widthSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y - heightSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y - heightSprite <= wall2.y + wall2.height / 2) ||
          (this.sprite.x + widthSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x + widthSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y + heightSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y + heightSprite <= wall2.y + wall2.height / 2) ||
          (this.sprite.x - widthSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x - widthSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y + heightSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y + heightSprite <= wall2.y + wall2.height / 2)
        ) {
          wall = true;
        }
      }
    } else if (this.sprite.rotation % Math.PI !== 0) {
      if (width) {
        if (
          (wall2.x - wall2.width / 2 >= this.sprite.x - heightSprite &&
            wall2.x - wall2.width / 2 <= this.sprite.x + heightSprite &&
            wall2.y - wall2.height / 2 >= this.sprite.y - widthSprite &&
            wall2.y - wall2.height / 2 <= this.sprite.y + widthSprite) ||
          (wall2.x - wall2.width / 2 >= this.sprite.x - heightSprite &&
            wall2.x - wall2.width / 2 <= this.sprite.x + heightSprite &&
            wall2.y + wall2.height / 2 >= this.sprite.y - widthSprite &&
            wall2.y + wall2.height / 2 <= this.sprite.y + widthSprite) ||
          (wall2.x + wall2.width / 2 >= this.sprite.x - heightSprite &&
            wall2.x + wall2.width / 2 <= this.sprite.x + heightSprite &&
            wall2.y - wall2.height / 2 >= this.sprite.y - widthSprite &&
            wall2.y - wall2.height / 2 <= this.sprite.y + widthSprite) ||
          (wall2.x + wall2.width / 2 >= this.sprite.x - heightSprite &&
            wall2.x + wall2.width / 2 <= this.sprite.x + heightSprite &&
            wall2.y + wall2.height / 2 >= this.sprite.y - widthSprite &&
            wall2.y + wall2.height / 2 <= this.sprite.y + widthSprite)
        ) {
          wall = true;
        }
      } else if (!width) {
        if (
          (this.sprite.x - heightSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x - heightSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y - widthSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y - widthSprite <= wall2.y + wall2.height / 2) ||
          (this.sprite.x + heightSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x + heightSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y - widthSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y - widthSprite <= wall2.y + wall2.height / 2) ||
          (this.sprite.x + heightSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x + heightSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y + widthSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y + widthSprite <= wall2.y + wall2.height / 2) ||
          (this.sprite.x - heightSprite >= wall2.x - wall2.width / 2 &&
            this.sprite.x - heightSprite <= wall2.x + wall2.width / 2 &&
            this.sprite.y + widthSprite >= wall2.y - wall2.height / 2 &&
            this.sprite.y + widthSprite <= wall2.y + wall2.height / 2)
        ) {
          wall = true;
        }
      }
    }
    return wall;
  };
  this.pause = () => {
    this.checkPause = true;
  };
  this.continue = () => {
    this.checkPause = false;
  };
  this.stopGame = () => {
    this.checkPause = true;
    this.arrEvil.forEach((tank: TankUnit) => {
      tank.stopGame();
    });
    clearInterval(this.time);
    this.arrTimeShut.forEach((time: NodeJS.Timeout) => {
      clearInterval(time);
    });
  };
};

export default TankPlayer;

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
  return function setDirection(n: number) {
    return n * a + b;
  };
}

function hitBill(
  r1: { x: number; y: number; width: number; height: number; rotation: number },
  x1: number,
  y1: number
) {
  let checkHit = false;
  const angle = r1.rotation;
  if (angle % Math.PI === 0) {
    if (
      x1 >= r1.x - r1.width / 2 &&
      x1 <= r1.x + r1.width / 2 &&
      y1 >= r1.y - r1.height / 2 &&
      y1 <= r1.y + r1.height / 2
    ) {
      checkHit = true;
    } else {
      checkHit = false;
    }
  } else if (angle % Math.PI !== 0) {
    if (
      x1 >= r1.x - r1.height / 2 &&
      x1 <= r1.x + r1.height / 2 &&
      y1 >= r1.y - r1.width / 2 &&
      y1 <= r1.y + r1.width / 2
    ) {
      checkHit = true;
    } else {
      checkHit = false;
    }
  }
  return checkHit;
}
