import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Hue from '../components/Hue';

test('renders correctly', () => {
  const {container} = render(
    <Hue id="red" hue="0">
      Red
    </Hue>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <label
        for="red"
      >
        <input
          id="red"
          name="hue"
          type="radio"
          value="0"
        />
        Red
      </label>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(
    <Hue id="red" hue="0">
      Red
    </Hue>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
