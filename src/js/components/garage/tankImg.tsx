import standartT from '../../../assets/images/weapons/brown/tankWithWeapons/tankstandart.png';
import bigBOOMT from '../../../assets/images/weapons/brown/tankWithWeapons/tankbigBOOM.png';
import rocketsT from '../../../assets/images/weapons/brown/tankWithWeapons/tankrockets.png';
import sniperT from '../../../assets/images/weapons/brown/tankWithWeapons/tanksniper.png';
import speedT from '../../../assets/images/weapons/brown/tankWithWeapons/tankspeed.png';

interface tanks {
  [propName: string]: any;
  standart: string;
  bigBOOM: string;
  rockets: string;
  sniper: string;
  speed: string;
}

const tankPaths: tanks = {
  standart: standartT,
  bigBOOM: bigBOOMT,
  rockets: rocketsT,
  sniper: sniperT,
  speed: speedT,
};

export default tankPaths;
