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
  choised?: boolean;
}

interface ruleWeapons extends Array<objWeapon> {
  [index: number]: {
    id: string;
    path: string;
    name: string;
    points: number;
    choised: boolean;
  };
}
const weapons: ruleWeapons = [
  {
    id: '1w',
    path: standartW,
    name: 'standart',
    points: 0,
    choised: true,
  },
  {
    id: '2w',
    path: bigBOOMW,
    name: 'bigBOOM',
    points: 50,
    choised: false,
  },
  {
    id: '3w',
    path: rocketsW,
    name: 'rockets',
    points: 70,
    choised: false,
  },
  {
    id: '4w',
    path: sniperW,
    name: 'sniper',
    points: 80,
    choised: false,
  },
  {
    id: '5w',
    path: speedW,
    name: 'speed',
    points: 100,
    choised: false,
  },
];

export { weapons, objWeapon };
