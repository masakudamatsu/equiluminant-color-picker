import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';
import 'jest-styled-components';

import Swatches from '../../components/Swatches';

const colorList = [
  {red: 123, green: 133, blue: 23},
  {red: 53, green: 2, blue: 223},
];

let container, getByLabelText;
beforeEach(() => {
  return ({container, getByLabelText} = render(
    <Swatches colors={colorList} />,
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <ul
        class="Swatches__Ul-sc-2rnu0-0 bXTsDc"
      >
        <li
          class="Swatches__Li-sc-2rnu0-1 ckfZtC"
        >
          <button
            class="Swatch__Button-sc-1m9mdn9-0 hNTCgO"
            data-testid="rgb-123-133-23"
            id="rgb(123, 133, 23)"
            type="button"
          >
            rgb(123, 133, 23)
          </button>
        </li>
        <li
          class="Swatches__Li-sc-2rnu0-1 ckfZtC"
        >
          <button
            class="Swatch__Button-sc-1m9mdn9-0 brMaRR"
            data-testid="rgb-53-2-223"
            id="rgb(53, 2, 223)"
            type="button"
          >
            rgb(53, 2, 223)
          </button>
        </li>
      </ul>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
