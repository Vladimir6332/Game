declare interface PlayOptionsCallback {
  (
    str: string,
    num: number,
    options: {
      damage: number;
      speedGun: number;
      speedBullet: number;
      range: number;
      bulletPacs: number;
      cost: number;
    }
  ): void;
}

declare interface PlayOptions {
  str: string;
  num: number;
  options: {
    damage: number;
    speedGun: number;
    speedBullet: number;
    range: number;
    bulletPacs: number;
    cost: number;
  };
}

declare interface WeaponOptions {
  str: string;
  num: number;
  options: {
    damage: number;
    speedGun: number;
    speedBullet: number;
    range: number;
    bulletPacs: number;
    cost: number;
  };
}
