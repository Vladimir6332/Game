/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import GameLogs from '../components/GameLogs/GameLogs';

afterEach(cleanup);
describe('Game Logs menu', () => {
  it('Game Logs should be exist', () => {
    render(
      <GameLogs
        log={{ typeMessage: 'damage me', message: 50 }}
        isNewGame={false}
        isEsc={false}
      />
    );
    const res = document.querySelector('.logs');
    expect(res).toBeInTheDocument();
  });
  it('Game Logs should have li component', () => {
    render(
      <GameLogs
        log={{ typeMessage: 'damage enemy', message: 100 }}
        isNewGame={false}
        isEsc={false}
      />
    );
    const res = screen.getByText('You have taken 100 damage');
    expect(res).toHaveClass('red');
  });
});
