import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Hue from '../components/Hue';

test('renders correctly', () => {
  const {container} = render(<Hue>Red</Hue>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <label>
        Red
        <input
          name="hue"
          type="radio"
          value=""
        />
      </label>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<Hue>Red</Hue>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
