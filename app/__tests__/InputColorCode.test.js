import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import InputColorCode from '../components/InputColorCode';

test('accepts HEX color codes', () => {
  const {container, getByLabelText} = render(<InputColorCode />);
  const colorCodeField = getByLabelText(/css color code/i);
  ['#3a5', '#A3C', '#4e2ba5'].forEach(colorCode => {
    userEvent.clear(colorCodeField);
    userEvent.type(colorCodeField, colorCode);
    expect(colorCodeField).toBeValid();
  });
});

test('accepts RGB color codes', () => {
  const {container, getByLabelText} = render(<InputColorCode />);
  const colorCodeField = getByLabelText(/css color code/i);
  [
    'rgb(1, 2, 3)',
    'rgb(12, 34, 33)',
    'rgb(133, 144, 122)',
    'rgb(233, 213, 202)',
    'rgb(255, 255, 255)',
  ].forEach(colorCode => {
    console.log(colorCode);
    userEvent.clear(colorCodeField);
    userEvent.type(colorCodeField, colorCode);
    console.log(colorCodeField.validity.patternMismatch);
    expect(colorCodeField).toBeValid();
  });
});

test('renders correctly', () => {
  const {container} = render(<InputColorCode />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <label
        for="inputColorCode"
      >
        CSS color code
        <input
          id="inputColorCode"
          pattern="#([A-Fa-f\\\\d]{3}){1,2}|rgb\\\\((1?\\\\d?\\\\d|2[0-4]\\\\d|25[0-5])(,\\\\s*(1?\\\\d?\\\\d|2[0-4]\\\\d|25[0-5])){2}\\\\)"
          type="text"
          value=""
        />
      </label>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<InputColorCode />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
