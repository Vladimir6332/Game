/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import GameMenu from '../components/Game/Game';
import { weapons } from '../components/garage/weapons/weapons';

afterEach(cleanup);
describe('Game menu', () => {
  it('pause works', () => {
    const arrStartOptions: Array<PlayOptions> = weapons.map((item) => {
      return {
        str: item.name,
        num: item.points,
        options: {
          damage: item.statistics.damage,
          speedBullet: item.statistics.speedBullet,
          speedGun: item.statistics.speedGun,
          range: item.statistics.range,
          bulletPacs: item.statistics.countBullets,
          cost: 10,
        },
      };
    });
    for (let i = 0; i < arrStartOptions.length; i += 1) {
      render(<GameMenu startOptions={arrStartOptions[i]} />);
      const pause = screen.getByText('Pause');
      fireEvent.mouseDown(pause);
      expect(screen.getByText('Press to continue')).toBeInTheDocument();
    }
  });
});
