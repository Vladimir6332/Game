import React, { useEffect } from 'react';
import clip from '../../assets/sounds/clip_menu_1.mp3';

const Menu: React.FC = () => {
  useEffect(() => {
    const audio = new Audio(clip);
    audio.load();
    audio.muted = false;
    audio.autoplay = true;

    console.log(audio);
  });

  return (
    <div className="menu-wrapper">
      <nav className="menu">
        <ul className="menu__list">
          <li className="menu__item menu__item_active">
            <div className="arrow-down">
              <span />
              <span />
              <span />
            </div>
            Single player
          </li>
          <li className="menu__item">Multiplayer</li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
