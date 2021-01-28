import React from 'react';
import jsxGetLog from '../servise/menu_logs_getCurrentLog';

describe('Demo', () => {
  it('should add correctly', () => {
    const result = jsxGetLog({ typeMessage: 'damage me', message: 10 }, 1);
    expect(result).toBe(20);
  });
});
