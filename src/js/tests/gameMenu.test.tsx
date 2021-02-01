/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameMenu from '../components/Game/Game';

describe('Game menu', () => {
  const startOptions = {
    str: 'standart',
    num: 100,
    options: {
      damage: 90,
      speedBullet: 100,
      speedGun: 100,
      range: 50,
      bulletPacs: 50,
      cost: 10,
    },
  };

  const userProfile = {
    kills: 0,
    deaths: 0,
    lastVisit: new Date(),
    accuracy: 0,
    nickName: 'Player',
    timeInGame: 0,
    id: 'id',
    shots: 10,
    accurateShots: 3,
  };
  beforeEach(() => {
    render(<GameMenu startOptions={startOptions} userProfile={userProfile} />);
  });
  it('Game Menu should be', () => {
    const weaponLi = document.querySelector('.game');
    expect(weaponLi).toBeInTheDocument();
  });
  it('pause should be works', () => {
    screen.debug();
    setTimeout(() => {
      fireEvent.click(screen.getByText('Pause'));
      expect(screen.getByText('Press to continue')).toBeInTheDocument();
    }, 1000);
  });
  it('Weapons icons should be', () => {
    const weaponLi = document.querySelector('.weapon');
    expect(weaponLi).toBeInTheDocument();
  });
});
