import React from 'react';
import {act, cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';
import 'jest-styled-components';

import Swatch from '../../components/Swatch';
// import * as mockCopyToClipboard from '../../utils/copyToClipboard';

const mockColor = {
  red: 123,
  green: 133,
  blue: 23,
  rgbCode: 'rgb(123, 133, 23)',
};

// jest.mock('../../utils/copyToClipboard');

beforeAll(() => {
  jest.useFakeTimers(); // see https://jestjs.io/docs/en/timer-mocks
});

let container, getByRole;
beforeEach(() => {
  // mockCopyToClipboard.mockResolvedValueOnce();
  return ({container, getByRole} = render(
    <Swatch r={mockColor.red} g={mockColor.green} b={mockColor.blue} />,
  ));
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.useRealTimers();
});

test('temporarily (1.5 sec) changes the button label when clicked', async () => {
  const button = getByRole('button', {name: mockColor.rgbCode});
  userEvent.click(button);
  expect(button).toHaveTextContent('Copied!');
  act(() => jest.advanceTimersByTime(1500));
  // For jest.advanceTimersByTime(), see https://jestjs.io/docs/en/timer-mocks
  // For act(), see https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning?ck_subscriber_id=661694401#1-when-using-jestusefaketimers
  expect(button).toHaveTextContent(mockColor.rgbCode);
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="Swatch__Button-sc-1m9mdn9-0 hNTCgO"
        data-testid="rgb-123-133-23"
        id="rgb(123, 133, 23)"
        type="button"
      >
        rgb(123, 133, 23)
      </button>
    </div>
  `);
});

test('is accessible', async () => {
  jest.useRealTimers();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
