/**
 * @jest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react';
import jsxGetLog from '../servise/menu_logs_getCurrentLog';

afterEach(cleanup);
describe('li logs in menu', () => {
  it('should be "You have dealt 50 damage"', () => {
    const component = jsxGetLog({
      typeMessage: 'damage me',
      message: 50,
    });
    render(component);
    expect(screen.getByText('You have dealt 50 damage')).toBeInTheDocument();
  });
  it('should be "You have taken 100 damage"', () => {
    const component = jsxGetLog({
      typeMessage: 'damage enemy',
      message: 100,
    });
    render(component);
    expect(screen.getByText('You have taken 100 damage')).toBeInTheDocument();
  });
  it('should be "You have killed by enemy..."', () => {
    const component = jsxGetLog({
      typeMessage: 'death me',
      message: 0,
    });
    render(component);
    expect(screen.getByText('You have killed by enemy...')).toBeInTheDocument();
  });
  it('should be "You have killed the enemy"', () => {
    const component = jsxGetLog({
      typeMessage: 'death enemy',
      message: 0,
    });
    render(component);
    expect(screen.getByText('You have killed the enemy')).toBeInTheDocument();
  });
});
