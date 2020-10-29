import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import Sector from '../../components/Sector';

const mockSetClickedColorCode = jest.fn();
const rgbValues = {red: '35', green: '241', blue: '134'};
const rgbCode = `rgb(${rgbValues.red}, ${rgbValues.green}, ${rgbValues.blue})`;

afterEach(() => {
  jest.clearAllMocks();
});

let container, getByRole;
beforeEach(() => {
  return ({container, getByRole} = render(
    <Sector
      angle={30}
      r={rgbValues.red}
      g={rgbValues.green}
      b={rgbValues.blue}
      setClickedColorCode={mockSetClickedColorCode}
    />,
  ));
});

test('calls setClickedColorCode() after being clicked', () => {
  userEvent.click(getByRole('button'));
  expect(mockSetClickedColorCode).toHaveBeenCalledTimes(1);
  expect(mockSetClickedColorCode).toHaveBeenCalledWith(rgbCode);
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        aria-label="rgb(35, 241, 134)"
        data-testid="rgb-35-241-134"
        type="button"
      >
        <svg
          aria-labelledby="Sector"
          class="Sector__Svg-sc-1otofyi-0 gBgXqf"
          viewBox="0 0 500 500"
        >
          <title
            id="Sector"
          >
            rgb(35, 241, 134)
          </title>
          <path
            d="M250,250 l250,0 A250,250 0,0,0 466.5063509461097,375 z"
            fill="rgb(35, 241, 134)"
          />
        </svg>
      </button>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
