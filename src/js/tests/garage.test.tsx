/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Garage from '../components/garage';

afterEach(cleanup);
describe('Garage', () => {
  const statisticsPerson: ProfileOfUser = {
    kills: 10,
    deaths: 9,
    lastVisit: new Date(),
    accuracy: 90,
    nickName: 'Sulti',
    timeInGame: 3502532,
    id: '2423',
    shots: 10,
    accurateShots: 3,
  };
  const startTrigger = () => {
    console.log('works');
  };
  it('Garage should be exist', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={55}
      />
    );
    const garage = document.querySelector('.garage');
    expect(garage).toBeInTheDocument();
  });
  it('Weapons should change', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={55}
      />
    );
    const currentWeapon1 = document.querySelector('.choisedWeapon');
    const weapons = document.querySelectorAll('.garage__weapon');
    fireEvent.click(weapons[3]);
    const currentWeapon2 = document.querySelector('.choisedWeapon');
    expect(currentWeapon1 !== currentWeapon2).toBeTruthy();
  });
  it('Points should change', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={55}
      />
    );
    const points = document.querySelector('.garage__points');
    const text = points.textContent;
    const weapons = document.querySelectorAll('.garage__weapon');
    fireEvent.click(weapons[3]);
    expect(text !== points.textContent).toBeTruthy();
  });
  it('Points should show note of few points', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={-10}
      />
    );
    fireEvent.click(document.querySelector('.garage__button'));
    const windowPoints = document.querySelector('.noPoints');
    expect(windowPoints).toBeInTheDocument();
  });
  it('Switcher bullet packs should not work when weapon is standart', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={-10}
      />
    );
    const switchButtonsWrapper = document.querySelector(
      '.garage__bullet-buttons'
    );
    const plusButton = document.querySelectorAll('.garage__bullet-button')[1];
    const numberPacks = switchButtonsWrapper.querySelector('span');
    fireEvent.click(plusButton);
    const numPack = numberPacks.textContent;
    expect(numPack).toBe('1');
  });
  it('Switcher bullet packs should work', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={-10}
      />
    );
    const switchButtonsWrapper = document.querySelector(
      '.garage__bullet-buttons'
    );
    const plusButton = document.querySelectorAll('.garage__bullet-button')[1];
    const numberPacks = switchButtonsWrapper.querySelector('span');
    const weapons = document.querySelectorAll('.garage__weapon');
    fireEvent.click(weapons[3]);
    fireEvent.click(plusButton);
    const numPack = numberPacks.textContent;
    expect(numPack).toBe('2');
  });
  it('Info bullet should change', () => {
    render(
      <Garage
        statisticsPerson={statisticsPerson}
        startTrigger={startTrigger}
        ALL_POINTS={100}
      />
    );
    const infoBullet = document.querySelector('.garage__bullet-info-subtitle');
    const textInfoBullet1 = infoBullet.textContent;
    const weapons = document.querySelectorAll('.garage__weapon');
    fireEvent.click(weapons[3]);
    const textInfoBullet2 = infoBullet.textContent;
    expect(textInfoBullet1 !== textInfoBullet2).toBeTruthy();
  });
});
