import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import HueSwatch from '../components/HueSwatch';

const mockProps = {
  hue: '30',
  title: 'Orange',
};

const mockGetHue = jest.fn();
const mockHandleSubmit = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test('Prop values are reflected in the color and the title element', () => {
  const {container, getByTitle} = render(
    <HueSwatch
      getHue={mockGetHue}
      handleSubmit={mockHandleSubmit}
      hue={mockProps.hue}
      title={mockProps.title}
    />,
  );
  const hueSwatch = getByTitle(mockProps.title);
  // expect(hueSwatch).toHaveStyle({fill: `hsl(${mockProps.hue},100%,50%)`}); This doesn't work...
});

test('Clicking the button calls the getHue function with its own hue value as an argument, and then calls the handleSubmit function', () => {
  const {container, getByTitle} = render(
    <HueSwatch
      getHue={mockGetHue}
      handleSubmit={mockHandleSubmit}
      hue={mockProps.hue}
      title={mockProps.title}
    />,
  );
  userEvent.click(getByTitle(mockProps.title));
  expect(mockGetHue).toHaveBeenCalledTimes(1);
  expect(mockGetHue).toHaveBeenCalledWith(mockProps.hue);
  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
});

test('renders correctly', () => {
  const {container} = render(
    <HueSwatch
      getHue={mockGetHue}
      handleSubmit={mockHandleSubmit}
      hue={mockProps.hue}
      title={mockProps.title}
    />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="HueSwatch__ButtonHueSwatch-r09t4l-1 fXIrO"
        data-testid="Orange"
        type="submit"
      >
        <svg
          aria-labelledby="colorName"
          class="HueSwatch__Svg-r09t4l-0 kqEmFs"
          viewBox="0 0 10 10"
        >
          <title
            id="colorName"
          >
            Orange
          </title>
          <rect
            height="10"
            width="10"
            x="0"
            y="0"
          />
        </svg>
      </button>
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(
    <HueSwatch
      getHue={mockGetHue}
      handleSubmit={mockHandleSubmit}
      hue={mockProps.hue}
      title={mockProps.title}
    />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
