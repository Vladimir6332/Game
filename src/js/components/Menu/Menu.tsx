import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SoundControl from './SoundControl';
import clipUrl from '../../../assets/sounds/clip_menu_1.mp3';
import menuSelectedSoundUrl from '../../../assets/sounds/menu_select.mp3';

const audioClip = new Audio(clipUrl);
const audioMenuSelected = new Audio(menuSelectedSoundUrl);
const defaultVolume = +localStorage.getItem('menuVolume');
const defaultMode = localStorage.getItem('menuMode');

const Menu: React.FC = () => {
  const menuItems: { id: number; value: string }[] = [
    { id: 1, value: 'single player' },
    { id: 2, value: 'multiplayer' },
  ];
  const history = useHistory();
  const [mode, setMode] = useState<string>(defaultMode || 'single player');

  const [volume, setVolume] = useState<number>(
    defaultVolume === 0 ? 0 : defaultVolume || 0
  );

  const handleVolume = (newVolume: number): void => {
    setVolume(newVolume);
    localStorage.setItem('menuVolume', newVolume.toString());
    audioClip.volume = newVolume / 100;
  };

  const handleClick = (newMode: string) => {
    setMode(newMode);
    localStorage.setItem('menuMode', newMode);
    menuSelectedSoundPlay();
  };

  const clipPlay = () => {
    if (audioClip.paused) {
      audioClip.muted = false;
      audioClip.autoplay = true;
      audioClip.play();
    }
    audioClip.volume = volume / 100;
  };

  const menuSelectedSoundPlay = () => {
    if (audioMenuSelected.paused) {
      audioMenuSelected.play();
    }
  };

  useEffect(clipPlay);

  return (
    <div className="menu-wrapper">
      <nav className="menu">
        <ul className="menu__list">
          {menuItems.map((element) => {
            return (
              <li
                onClick={() => handleClick(element.value)}
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
        <button
          type="button"
          className="menu__play"
          onClick={() => history.push('/login')}
        >
          Play
        </button>
      </nav>
      <SoundControl onChange={handleVolume} defaultVolume={defaultVolume} />
    </div>
  );
};

export default Menu;
