/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import GameMenu from '../components/Game/Game';

afterEach(cleanup);
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
  render(<GameMenu startOptions={startOptions} />);
  it('Game Menu should be', () => {
    const weaponLi = document.querySelector('.game');
    expect(weaponLi).toBeInTheDocument();
  });
  it('pause should be works', () => {
    render(<GameMenu startOptions={startOptions} />);
    fireEvent.click(screen.getByText('Pause'));
    expect(screen.getByText('Press to continue')).toBeInTheDocument();
  });
  it('Weapons icons should be', () => {
    render(<GameMenu startOptions={startOptions} />);
    const weaponLi = document.querySelector('.weapon');
    expect(weaponLi).toBeInTheDocument();
  });
});
