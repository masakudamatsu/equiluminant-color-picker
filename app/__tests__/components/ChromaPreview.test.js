import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import ChromaPreview from '../../components/ChromaPreview';

let container, getByTestId, rerender;
beforeEach(() => {
  return ({container, getByTestId, rerender} = render(
    <ChromaPreview chroma={'128'} />,
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

test('sets the color by props.hue', () => {
  expect(getByTestId('Purple')).toHaveAttribute('fill', 'rgb(191, 63, 191)');
  expect(getByTestId('Red')).toHaveAttribute('fill', 'rgb(191, 63, 63)');
  expect(getByTestId('Yellow')).toHaveAttribute('fill', 'rgb(191, 191, 63)');
  expect(getByTestId('Green')).toHaveAttribute('fill', 'rgb(63, 191, 63)');
  expect(getByTestId('Cyan')).toHaveAttribute('fill', 'rgb(63, 191, 191)');
  expect(getByTestId('Blue')).toHaveAttribute('fill', 'rgb(63, 63, 191)');

  rerender(<ChromaPreview chroma={'64'} />);
  expect(getByTestId('Purple')).toHaveAttribute('fill', 'rgb(159, 95, 159)');
  expect(getByTestId('Red')).toHaveAttribute('fill', 'rgb(159, 95, 95)');
  expect(getByTestId('Yellow')).toHaveAttribute('fill', 'rgb(159, 159, 95)');
  expect(getByTestId('Green')).toHaveAttribute('fill', 'rgb(95, 159, 95)');
  expect(getByTestId('Cyan')).toHaveAttribute('fill', 'rgb(95, 159, 159)');
  expect(getByTestId('Blue')).toHaveAttribute('fill', 'rgb(95, 95, 159)');
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <svg
        aria-labelledby="ChromaPreview"
        class="ChromaPreview__Svg-sc-1ccy2fs-0 bKNLsH"
        viewBox="0 0 281 187"
      >
        <title
          id="ChromaPreview"
        >
          The preview of how the chroma value you have set affects the apperance of six pure hues: purple, red, yellow, green, cyan, and blue
        </title>
        <g
          id="Top-row-of-swatches"
        >
          <rect
            data-testid="Purple"
            fill="rgb(191, 63, 191)"
            height="93"
            width="93"
            x="0"
            y="0"
          />
          <rect
            data-testid="Red"
            fill="rgb(191, 63, 63)"
            height="93"
            width="93"
            x="94"
            y="0"
          />
          <rect
            data-testid="Yellow"
            fill="rgb(191, 191, 63)"
            height="93"
            width="93"
            x="188"
            y="0"
          />
        </g>
        <g
          id="Bottom-row-of-swatches"
          transform="translate(0 94)"
        >
          <rect
            data-testid="Green"
            fill="rgb(63, 191, 63)"
            height="93"
            width="93"
            x="0"
            y="0"
          />
          <rect
            data-testid="Cyan"
            fill="rgb(63, 191, 191)"
            height="93"
            width="93"
            x="94"
            y="0"
          />
          <rect
            data-testid="Blue"
            fill="rgb(63, 63, 191)"
            height="93"
            width="93"
            x="188"
            y="0"
          />
        </g>
      </svg>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});
