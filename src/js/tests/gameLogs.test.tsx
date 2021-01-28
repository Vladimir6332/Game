/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import GameLogs from '../components/GameLogs/GameLogs';

afterEach(cleanup);
describe('Game Logs menu', () => {
  it('gameLogs should have li component', () => {
    render(<GameLogs log={{ typeMessage: 'damage me', message: 50 }} />);
    const res = screen.getByText('You have dealt 50 damage');
    expect(res).toHaveClass('green');
  });
});
