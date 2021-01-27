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
  player: any,
  musImmoptalBlocks: Array<{ arr: any }>,
  musBreakBlocks: Array<{ arr: any }>
) {
  this.x = x;
  this.y = y;
  this.sprite = new PIXI.Sprite(
    PIXI.Texture.from('assets/images/red/tank.png')
  );
  this.gan = new PIXI.Sprite(PIXI.Texture.from(gan));
  this.bullet = `${gan
    .split('/')
    .slice(0, gan.split('/').length - 1)
    .join('/')}/bullet.png`;
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
  this.check = false;
  this.time = 0;
  this.timeRender = 0;
  this.musBreakBlocks = musBreakBlocks;
  this.musImmoptalBlocks = musImmoptalBlocks;
  this.taran = false;
  this.arrTimeShut = [];

  this.init = () => {
    this.renderStart();
    this.renderGan();
    this.time = setInterval(this.moveTank, 50);
    this.timeRender = setInterval(this.render, 17);
  };
  this.renderStart = () => {
    this.healthRender.clear();
    const dWidth = this.gan.width / this.sprite.width;
    const dHeight = this.gan.height / this.sprite.height;
    this.sprite.pivot.y = this.sprite.height / 2;
    this.sprite.pivot.x = this.sprite.width / 2;
    this.sprite.width = this.appWidth * 0.1;
    this.sprite.height = this.sprite.width / 2;
    this.sprite.y = this.y - this.sprite.height / 2;
    this.sprite.x = this.x - this.sprite.width / 2;
    this.sprite.rotation = Math.PI;
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
    this.healthRender.clear();
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
    if (this.health <= 0) {
      this.dead();
    }
    this.healthRender.endFill();
  };
  this.moveTank = () => {
    if (this.checkFind || this.player.checkPause) return;
    if (this.sprite.rotation === 0) {
      this.sprite.x += 5;
      this.gan.x += 5;
      if (this.turn()) {
        this.sprite.x -= 5;
        this.gan.x -= 5;
        this.sprite.y += 5;
        this.gan.y += 5;
        this.sprite.rotation = Math.PI / 2;
        this.gan.rotation = Math.PI / 2;
      }
    } else if (this.sprite.rotation === Math.PI) {
      this.sprite.x -= 5;
      this.gan.x -= 5;
      if (this.turn()) {
        this.sprite.x += 5;
        this.gan.x += 5;
        this.sprite.y -= 5;
        this.gan.y -= 5;
        this.sprite.rotation = (3 * Math.PI) / 2;
        this.gan.rotation = (3 * Math.PI) / 2;
      }
    } else if (this.sprite.rotation === (3 * Math.PI) / 2) {
      this.sprite.y -= 5;
      this.gan.y -= 5;
      if (this.turn()) {
        this.sprite.x += 5;
        this.gan.x += 5;
        this.sprite.y += 5;
        this.gan.y += 5;
        this.sprite.rotation = 0;
        this.gan.rotation = 0;
      }
    } else {
      this.sprite.y += 5;
      this.gan.y += 5;
      if (this.turn()) {
        this.sprite.x -= 5;
        this.gan.x -= 5;
        this.sprite.y -= 5;
        this.gan.y -= 5;
        this.sprite.rotation = Math.PI;
        this.gan.rotation = Math.PI;
      }
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
    if (
      checkLenght(this.player.sprite, this.sprite) &&
      !this.player.checkDead
    ) {
      this.checkFind = true;
      clearInterval(this.time);
      this.time = setInterval(this.findPlayer, 50);
    }
  };
  this.batter = (r2: {
    rotation: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    let hit = false;
    const r1 = this.sprite;
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
    if (this.player.checkPause) return;
    this.angleX = this.player.sprite.x;
    this.angleY = this.player.sprite.y;
    this.renderGan();
  };
  this.shut = () => {
    if (this.callDown || this.checkDead) return;
    this.callDown = true;
    const tankBund = this.player;
    const clonConteiner = this.conteiner;
    const clonMusBreakBlocks = this.musBreakBlocks;
    const clonMusImmoptalBlocks = this.musImmoptalBlocks;
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
    const r = new PIXI.Sprite(PIXI.Texture.from(this.bullet));
    let final = this.aim - this.gan.width * 0.7;
    r.pivot.x = r.width / 2;
    r.pivot.y = r.height / 2;
    const { width } = r;
    r.width = 30;
    r.height *= r.width / width;
    r.rotation = anglee(this.sprite.x, this.sprite.y, mx, my);
    const timeShut = setInterval(() => paint.call(this), 17);
    this.arrTimeShut.push(timeShut);
    function paint() {
      if (tankBund.checkPause) return;
      r.x = startX;
      r.y = startY;
      clonMusBreakBlocks.forEach((block: any, index: number) => {
        if (hitBill(block, startX, startY)) {
          clonConteiner.removeChild(block);
          clonMusBreakBlocks.splice(index, 1);
          clonConteiner.removeChild(r);
          clearInterval(timeShut);
          this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
        }
      });
      clonMusImmoptalBlocks.forEach((block: any) => {
        if (hitBill(block, startX, startY)) {
          clonConteiner.removeChild(r);
          clearInterval(timeShut);
          this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
        }
      });
      if (hitBill(tankBund.sprite, startX, startY)) {
        clonConteiner.removeChild(r);
        tankBund.health -= 100;
        clearInterval(timeShut);
        this.arrTimeShut.splice(this.arrTimeShut.indexOf(timeShut), 1);
      }
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
      final -= 10;
    }
    clonConteiner.addChild(r);
  };
  this.findPlayer = () => {
    if (this.checkDead || !this.checkFind || this.player.checkPause) return;
    if (this.player.checkDead) {
      this.checkFind = false;
      clearInterval(this.time);
      this.sprite.rotation = 0;
      this.gan.rotation = 0;
      this.time = setInterval(this.moveTank, 50);
      return;
    }
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
        if (this.turn()) {
          this.sprite.y += 7;
          this.sprite.x -= 7;
          this.sprite.rotation = Math.PI / 2;
          this.gan.y += 7;
          this.gan.x -= 7;
          this.gan.rotation = Math.PI / 2;
        }
      } else {
        this.sprite.x -= 7;
        this.sprite.rotation = Math.PI;
        this.gan.x -= 7;
        this.gan.rotation = Math.PI;
        if (this.turn()) {
          this.sprite.y -= 7;
          this.sprite.x += 7;
          this.sprite.rotation = (Math.PI * 3) / 2;
          this.gan.y -= 7;
          this.gan.x += 7;
          this.gan.rotation = (Math.PI * 3) / 2;
        }
      }
    } else if (!this.naprv) {
      if (dy > 0) {
        this.sprite.y += 7;
        this.sprite.rotation = Math.PI / 2;
        this.gan.y += 7;
        this.gan.rotation = Math.PI / 2;
        if (this.turn()) {
          this.sprite.y -= 7;
          this.sprite.x -= 7;
          this.sprite.rotation = Math.PI;
          this.gan.y -= 7;
          this.gan.x -= 7;
          this.gan.rotation = Math.PI;
        }
      } else {
        this.sprite.y -= 7;
        this.sprite.rotation = (Math.PI * 3) / 2;
        this.gan.y -= 7;
        this.gan.rotation = (Math.PI * 3) / 2;
        if (this.turn()) {
          this.sprite.y += 7;
          this.sprite.x += 7;
          this.sprite.rotation = 0;
          this.gan.y += 7;
          this.gan.x += 7;
          this.gan.rotation = 0;
        }
      }
    }
    this.stepBad -= 7;
    if (this.batter(this.player.sprite) && !this.taran) {
      this.health -= 300;
      this.player.health -= 300;
    }
    this.moveGan();
    this.renderGan();
    this.shut();
  };
  this.dead = () => {
    const { arrEvil } = this.player;
    this.conteiner.removeChild(this.sprite, this.gan, this.healthRender);
    this.checkDead = true;
    clearInterval(this.time);
    clearInterval(this.timeRender);
    arrEvil.splice(arrEvil.indexOf(this), 1);
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
      if (
        this.sprite.x < widthSprite ||
        this.sprite.x > this.appWidth - widthSprite ||
        this.sprite.y < widthSprite ||
        this.sprite.y > this.appHeigth - widthSprite
      ) {
        wall = true;
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
      if (
        this.sprite.x < widthSprite ||
        this.sprite.x > this.appWidth - widthSprite ||
        this.sprite.y < widthSprite ||
        this.sprite.y > this.appHeigth - widthSprite
      ) {
        wall = true;
      }
    }
    return wall;
  };
  this.turn = () => {
    const musMap = [...this.musBreakBlocks, ...this.musImmoptalBlocks];
    return musMap.some(
      (mapI: { x: number; y: number; width: number; height: number }) => {
        return this.checkWall(mapI);
      }
    );
  };
  this.stopGame = () => {
    clearInterval(this.timeRender);
    clearInterval(this.time);
    this.arrTimeShut.forEach((time: any) => {
      clearInterval(time);
    });
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
  return Math.sqrt((tank.x - tank2.x) ** 2 + (tank.y - tank2.y) ** 2) < 10;
}
