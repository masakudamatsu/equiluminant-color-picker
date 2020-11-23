import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import Swatches from './Swatches';

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
    .c2 {
      background-color: rgb(123,133,23);
      border: 1px solid black;
      border-radius: 4px;
      color: white;
      height: 48px;
      text-align: center;
      width: 100%;
    }

    .c2[disabled] {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .c3 {
      background-color: rgb(53,2,223);
      border: 1px solid black;
      border-radius: 4px;
      color: white;
      height: 48px;
      text-align: center;
      width: 100%;
    }

    .c3[disabled] {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .c0 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      width: 100%;
    }

    .c1 {
      list-style: none;
      margin-top: 24px;
      width: 50%;
    }

    .c1:last-child {
      margin-bottom: 24px;
    }

    <div>
      <ul
        class="c0"
      >
        <li
          class="c1"
        >
          <button
            class="c2"
            data-testid="swatch"
            id="rgb(123, 133, 23)"
            type="button"
          >
            rgb(123, 133, 23)
          </button>
        </li>
        <li
          class="c1"
        >
          <button
            class="c3"
            data-testid="swatch"
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
