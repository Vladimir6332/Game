import React from 'react';
import bigBOOM from '../../../assets/images/weapons/brown/bigBOOM/bigBOOM.png';
import rockets from '../../../assets/images/weapons/brown/rockets/rockets.png';
import sniper from '../../../assets/images/weapons/brown/sniper/sniper.png';
import speed from '../../../assets/images/weapons/brown/speed/speed.png';
import standart from '../../../assets/images/weapons/brown/standart/standart.png';

const images: { [key: string]: any } = {
  bigBOOM,
  rockets,
  sniper,
  speed,
  standart,
};

interface Props {
  options: WeaponOptions | null;
}

const Weapon: React.FC<Props> = ({ options }: Props) => {
  console.log(options.str);
  const img = images[options.str];
  // useEffect(() => {
  //   const img = images.find((name) => name === options.str);
  //   img
  // }, [name]);
  return <div className="weapon" style={{ backgroundImage: `url(${img})` }} />;
};

export default Weapon;
