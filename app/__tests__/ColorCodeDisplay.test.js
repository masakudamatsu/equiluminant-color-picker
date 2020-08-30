import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import ColorCodeDisplay from '../components/ColorCodeDisplay';

const colorList = [
  {red: 123, green: 133, blue: 23},
  {red: 53, green: 2, blue: 223},
];
const color = colorList[0];
const colorCode = `rgb(${color.red}, ${color.green}, ${color.blue})`;

test('renders correctly', () => {
  const {container} = render(<ColorCodeDisplay>{colorCode}</ColorCodeDisplay>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p>
        rgb(123, 133, 23)
      </p>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<ColorCodeDisplay>{colorCode}</ColorCodeDisplay>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
