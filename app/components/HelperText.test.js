import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import HelperText from './HelperText';

let container;

beforeEach(() => {
  return ({container} = render(<HelperText />));
});

// afterEach(() => {
//   jest.clearAllMocks();
// });

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    .c4::before,
    .c4::after {
      content: '';
      display: block;
      height: 0;
      width: 0;
    }

    .c4::before {
      margin-bottom: -0.3772em;
    }

    .c4::after {
      margin-top: -0.4045em;
    }

    .c4:not(:first-child) {
      padding-top: 0.8035714285714286rem;
    }

    .c1::before,
    .c1::after {
      content: '';
      display: block;
      height: 0;
      width: 0;
    }

    .c1::before {
      margin-bottom: -0.3772em;
    }

    .c1::after {
      margin-top: -0.4045em;
    }

    .c3 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      list-style: none;
    }

    .c0 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      font-size: 1.0139952468972802rem;
      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
    }

    .c2 {
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      width: 11.53419593345656px;
    }

    <div>
      <div
        class="c0"
      >
        <p
          class="c1"
        >
          Examples:
        </p>
        <div
          class="c2"
        />
        <ul
          class="c3"
        >
          <li
            class="c4"
          >
            rgb(66, 135, 245)
          </li>
          <li
            class="c4"
          >
            hsl(217, 90%, 61%)
          </li>
          <li
            class="c4"
          >
            #4287f5
          </li>
        </ul>
      </div>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
