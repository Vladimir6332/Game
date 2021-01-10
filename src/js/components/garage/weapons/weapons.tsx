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
}

interface ruleWeapons extends Array<objWeapon> {
  [index: number]: {
    id: string;
    path: string;
    name: string;
    points: number;
  };
}
const weapons: ruleWeapons = [
  {
    id: '1w',
    path: standartW,
    name: 'standart',
    points: 20,
  },
  {
    id: '2w',
    path: bigBOOMW,
    name: 'bigBOOM',
    points: 50,
  },
  {
    id: '3w',
    path: rocketsW,
    name: 'rockets',
    points: 70,
  },
  {
    id: '4w',
    path: sniperW,
    name: 'sniper',
    points: 80,
  },
  {
    id: '5w',
    path: speedW,
    name: 'speed',
    points: 100,
  },
];

export { weapons, objWeapon };
