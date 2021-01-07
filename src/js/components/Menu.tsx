import React, { useState, useEffect } from 'react';
import clip from '../../assets/sounds/clip_menu_1.mp3';

const audio = new Audio(clip);

const Menu: React.FC = () => {
  const menuItems: { id: number; value: string }[] = [
    { id: 1, value: 'single player' },
    { id: 2, value: 'multiplayer' },
  ];
  const [mode, setMode] = useState<string>('single player');

  const handleClick = (newMode: string) => {
    setMode(newMode);
  };
  const handleKeyDown = (newMode: string) => {
    console.log(newMode);
  };

  useEffect(() => {
    if (audio.paused) {
      audio.muted = false;
      audio.autoplay = true;
    }
  });

  return (
    <div className="menu-wrapper">
      <nav className="menu">
        <ul className="menu__list">
          {menuItems.map((element) => {
            return (
              <li
                onClick={() => handleClick(element.value)}
                onKeyDown={() => handleKeyDown(element.value)}
                role="presentation"
                key={element.id}
                className={`menu__item${
                  element.value === mode ? ' menu__item_active' : ''
                }`}
              >
                {element.value === mode ? (
                  <div className="arrow-down">
                    <span />
                    <span />
                    <span />
                  </div>
                ) : null}
                {element.value}
              </li>
            );
          })}
        </ul>
        <button type="button" className="menu__play">
          Play
        </button>
      </nav>
    </div>
  );
};

export default Menu;
