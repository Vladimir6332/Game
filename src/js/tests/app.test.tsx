/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';

window.HTMLMediaElement.prototype.load = (): void => {
  console.log('load');
};
window.HTMLMediaElement.prototype.play = async (): Promise<void> => {
  console.log('play');
};
window.HTMLMediaElement.prototype.pause = (): void => {
  console.log('pause');
};
const clickSinglePlayer = (): void => {
  const singlePlayButton = screen.getByText('single player');
  const playButton = screen.getByText('Play');
  fireEvent.click(singlePlayButton);
  fireEvent.click(playButton);
};
afterEach(cleanup);
describe('App', () => {
  it('App should be exist', () => {
    render(<App />);
    const app = document.querySelector('.app');
    expect(app).toBeInTheDocument();
  });
  it('App should change screen', () => {
    render(<App />);
    clickSinglePlayer();
    const authForm = document.querySelector('.auth__form');
    expect(authForm).toBeInTheDocument();
  });
  it('Login buttons should work (Register)', () => {
    render(<App />);
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);
    const signUp = document.querySelector('.button_sign-up');
    expect(signUp).toBeInTheDocument();
  });
  it('Login buttons should work (Reset Profile)', () => {
    render(<App />);
    const registerButton = screen.getByText('Reset Profile');
    fireEvent.click(registerButton);
    const signUp = document.querySelector('.button_sign-up');
    expect(signUp).toBeInTheDocument();
  });
  it('Login buttons should change back from (Reset Profile)', () => {
    render(<App />);
    const registerButton = document.querySelector('#login');
    fireEvent.click(registerButton);
    const signUp = document.querySelector('.button_sign-up');
    expect(signUp).toBeInTheDocument();
  });
});
