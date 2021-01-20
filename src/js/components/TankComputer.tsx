import * as PIXI from 'pixi.js-legacy';

function TankComputer(
  this: any,
  x: number,
  y: number,
  gan: string,
  aim: number,
  timeCallDown: number,
  appWidth: number,
  appHeigth: number,
  conteiner: any,
  player: any
) {
  this.x = x;
  this.y = y;
  this.sprite = new PIXI.Sprite(
    PIXI.Texture.from('assets/images/red/tank.png')
  );
  this.gan = new PIXI.Sprite(PIXI.Texture.from(gan));
  this.healthRender = new PIXI.Graphics();
  this.health = 600;
  this.fullHealth = 600;
  this.aim = aim;
  this.angleX = 0;
  this.angleY = 0;
  this.callDown = false;
  this.timeCallDown = timeCallDown;
  this.angleGan = Math.PI;
  this.appHeigth = appHeigth;
  this.appWidth = appWidth;
  this.conteiner = conteiner;
  this.checkFind = false;
  this.player = player;
  this.stepBad = 0;
  this.count = 0;
  this.naprv = false;
  this.checkDead = false;

  this.init = () => {
    this.renderStart();
    this.renderGan();
    this.moveTank();
  };
  this.renderStart = () => {
    this.healthRender.clear();
    this.sprite.pivot.y = this.sprite.height / 2;
    this.sprite.pivot.x = this.sprite.width / 2;
    this.sprite.width = 100;
    this.sprite.height = 50;
    this.sprite.y = this.y - this.sprite.height / 2;
    this.sprite.x = this.x - this.sprite.width / 2;
    this.sprite.rotation = Math.PI;
    this.gan.y = this.y + this.sprite.height / 2;
    this.gan.x = this.x + this.sprite.width / 2;
    this.gan.pivot.y = this.gan.height / 2;
    this.gan.pivot.x = this.gan.width * 0.3;
    this.gan.width *= 0.1;
    this.gan.height *= 0.1;
    this.gan.rotation = this.angleGan;
    this.healthRender.lineStyle(4, 0x000000, 1, 0.5, true);
    this.healthRender.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 - 20,
      100,
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
      (100 * this.health) / this.fullHealth,
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
    this.healthRender.clear();
    this.healthRender.lineStyle(4, 0x000000, 1, 0.5, true);
    this.healthRender.drawRect(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2 - 20,
      100,
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
      (100 * this.health) / this.fullHealth,
      4
    );
    this.healthRender.endFill();
  };
  this.moveTank = () => {
    if (this.checkFind) return;
    if (this.sprite.rotation === 0) {
      this.sprite.x += 5;
      this.gan.x += 5;
    } else if (this.sprite.rotation === Math.PI) {
      this.sprite.x -= 5;
      this.gan.x -= 5;
    } else if (this.sprite.rotation === (3 * Math.PI) / 2) {
      this.sprite.y -= 5;
      this.gan.y -= 5;
    } else {
      this.sprite.y += 5;
      this.gan.y += 5;
    }
    this.count += 1;
    if (this.count === 50) {
      this.count = 0;
      this.sprite.rotation += Math.PI / 2;
      this.gan.rotation += Math.PI / 2;
      if (this.sprite.rotation === Math.PI * 2) {
        this.sprite.rotation = 0;
        this.gan.rotation = 0;
      }
    }
    if (checkLenght(this.player.sprite, this.sprite)) {
      this.checkAss = true;
      this.findPlayer();
      return;
    }
    setTimeout(this.moveTank, 50);
    this.render();
  };
  this.batter = () => {
    let hit = false;
    const r1 = this.sprite;
    const r2 = this.player.sprite;
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
  };
  this.moveGan = () => {
    this.angleX = this.player.sprite.x;
    this.angleY = this.player.sprite.y;
    this.renderGan();
  };
  this.shut = () => {
    if (this.callDown || this.checkDead) return;
    this.callDown = true;
    const tankBund = this.player;
    const clonConteiner = this.conteiner;
    setTimeout(() => {
      this.callDown = false;
    }, this.timeCallDown);
    const mx = this.player.sprite.x;
    const my = this.player.sprite.y;
    const dy = createNaprv(mx, my, this.sprite.x, this.sprite.y);
    const dx =
      Math.sin(anglee(this.sprite.x, this.sprite.y, mx, my) + Math.PI / 2) * 10;
    let startX = this.sprite.x + (dx * this.gan.width * 0.7) / 10;
    let startY =
      this.sprite.y -
      Math.cos(anglee(this.sprite.x, this.sprite.y, mx, my) + Math.PI / 2) *
        this.gan.width *
        0.7;
    const r = new PIXI.Graphics();
    let final = this.aim - this.gan.width * 0.7;
    function paint() {
      r.clear();
      r.beginFill(0x000000, 1);
      r.drawCircle(startX, startY, 2);
      if (hitBill(tankBund.sprite, startX, startY)) {
        r.clear();
        clonConteiner.removeChild(r);
        tankBund.health -= 100;
        if (tankBund.health <= 0) {
          tankBund.dead();
        }
        return;
      }
      startX += dx;
      startY = dy(startX);
      if (
        startY > this.appHeigth ||
        startX > this.appWidth ||
        startY < 0 ||
        startX < 0
      ) {
        r.clear();
        clonConteiner.removeChild(r);
        return;
      }
      if (final <= 0) {
        r.clear();
        clonConteiner.removeChild(r);
        return;
      }
      final -= 10;
      setTimeout(paint, 17);
    }
    clonConteiner.addChild(r);
    setTimeout(paint, 0);
  };
  this.findPlayer = () => {
    if (this.checkDead) return;
    const dx = this.player.sprite.x - this.sprite.x;
    const dy = this.player.sprite.y - this.sprite.y;
    if (this.stepBad <= 0) {
      this.naprv = Math.abs(dx) > Math.abs(dy);
      this.stepBad = this.naprv ? Math.abs(dx) / 2 : Math.abs(dy) / 2;
    }
    if (this.naprv) {
      if (dx > 0) {
        this.sprite.x += 7;
        this.sprite.rotation = 0;
        this.gan.x += 7;
        this.gan.rotation = 0;
      } else {
        this.sprite.x -= 7;
        this.sprite.rotation = Math.PI;
        this.gan.x -= 7;
        this.gan.rotation = Math.PI;
      }
    } else if (!this.naprv) {
      if (dy > 0) {
        this.sprite.y += 7;
        this.sprite.rotation = Math.PI / 2;
        this.gan.y += 7;
        this.gan.rotation = Math.PI / 2;
      } else {
        this.sprite.y -= 7;
        this.sprite.rotation = (Math.PI * 3) / 2;
        this.gan.y -= 7;
        this.gan.rotation = (Math.PI * 3) / 2;
      }
    }
    this.stepBad -= 7;
    this.shut();
    this.moveGan();
    this.render();
    this.renderGan();
    if (!this.batter()) {
      console.log('Тоби пизда!');
      setTimeout(this.findPlayer, 50);
    } else {
      console.log('You were checked! LOL!');
    }
  };
  this.dead = () => {
    this.conteiner.removeChild(this.sprite, this.gan, this.healthRender);
    this.checkDead = true;
  };
}

export default TankComputer;

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

function checkLenght(
  tank: { x: number; y: number },
  tank2: { x: number; y: number }
) {
  return Math.sqrt((tank.x - tank2.x) ** 2 + (tank.y - tank2.y) ** 2) < 400;
}
