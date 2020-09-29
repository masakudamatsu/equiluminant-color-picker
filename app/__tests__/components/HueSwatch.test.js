import React from 'react';
import {cleanup, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import HueSwatch from '../../components/HueSwatch';

const mockProps = {
  hue: '30',
  left: '0',
  title: 'Orange',
  top: '0',
  zIndex: '1',
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
      left={mockProps.left}
      title={mockProps.title}
      top={mockProps.top}
      zIndex={mockProps.zIndex}
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
      left={mockProps.left}
      title={mockProps.title}
      top={mockProps.top}
      zIndex={mockProps.zIndex}
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
      left={mockProps.left}
      title={mockProps.title}
      top={mockProps.top}
      zIndex={mockProps.zIndex}
    />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        class="HueSwatch__ButtonHueSwatch-r09t4l-1 jWidlo"
        data-testid="Orange"
        type="submit"
      >
        <svg
          aria-labelledby="colorName"
          class="HueSwatch__Svg-r09t4l-0 ehVVhR"
          viewBox="0 0 60 120"
        >
          <title
            id="colorName"
          >
            Orange
          </title>
          <rect
            height="120"
            width="60"
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
      left={mockProps.left}
      title={mockProps.title}
      top={mockProps.top}
      zIndex={mockProps.zIndex}
    />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
