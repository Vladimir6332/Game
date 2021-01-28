/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render } from '@testing-library/react';
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
});
