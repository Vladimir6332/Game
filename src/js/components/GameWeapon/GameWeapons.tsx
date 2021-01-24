import React, { ReactElement } from 'react';
import Weapon from './Weapon';

interface Props {
  startOptions: PlayOptions | null;
}

const GameWeapons: React.FC<Props> = ({ startOptions }: Props) => {
  const startOptionsArr: WeaponOptions[] = [startOptions];

  const weaponsList = startOptionsArr.map(
    (weapon: WeaponOptions): ReactElement => (
      <li className="weapons__item" key={weapon.str}>
        <Weapon options={weapon} />
      </li>
    )
  );
  return (
    <div className="weapons">
      <ul className="weapons__list">{weaponsList}</ul>
    </div>
  );
};

export default GameWeapons;
