import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import InputColorCode from '../components/InputColorCode';

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
