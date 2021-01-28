import standartW from '../../../../assets/images/weapons/brown/standart/standart.png';
import bigBOOMW from '../../../../assets/images/weapons/brown/bigBOOM/bigBOOM.png';
import rocketsW from '../../../../assets/images/weapons/brown/rockets/rockets.png';
import sniperW from '../../../../assets/images/weapons/brown/sniper/sniper.png';
import speedW from '../../../../assets/images/weapons/brown/speed/speed.png';

interface objWeapon {
  id: string;
  name: string;
  path: string;
  points: number;
  statistics: {
    damage: number;
    speedGun: number;
    speedBullet: number;
    range: number;
    countBullets: number;
  };
  choised?: boolean;
}

interface ruleWeapons extends Array<objWeapon> {
  [index: number]: {
    id: string;
    path: string;
    name: string;
    points: number;
    choised: boolean;
    statistics: {
      damage: number;
      speedGun: number;
      speedBullet: number;
      range: number;
      countBullets: number;
    };
  };
}
const weapons: ruleWeapons = [
  {
    id: '1w',
    path: standartW,
    name: 'standart',
    points: 0,
    choised: true,
    statistics: {
      damage: 10,
      speedBullet: 2,
      speedGun: 5,
      range: 55,
      countBullets: 10,
    },
  },
  {
    id: '2w',
    path: bigBOOMW,
    name: 'bigBOOM',
    points: 50,
    choised: false,
    statistics: {
      damage: 95,
      speedBullet: 5,
      speedGun: 3,
      range: 70,
      countBullets: 5,
    },
  },
  {
    id: '3w',
    path: rocketsW,
    name: 'rockets',
    points: 70,
    choised: false,
    statistics: {
      damage: 40,
      speedBullet: 3,
      speedGun: 10,
      range: 75,
      countBullets: 8,
    },
  },
  {
    id: '4w',
    path: sniperW,
    name: 'sniper',
    points: 80,
    choised: false,
    statistics: {
      damage: 20,
      speedBullet: 7,
      speedGun: 5,
      range: 100,
      countBullets: 5,
    },
  },
  {
    id: '5w',
    path: speedW,
    name: 'speed',
    points: 100,
    choised: false,
    statistics: {
      damage: 5,
      speedBullet: 10,
      speedGun: 10,
      range: 67,
      countBullets: 20,
    },
  },
];

export { weapons, objWeapon };
