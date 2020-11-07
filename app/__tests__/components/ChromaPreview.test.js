import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {axe} from 'jest-axe';
import 'jest-axe/extend-expect';

import ChromaPreview from '../../components/ChromaPreview';
import rgbCode from '../../utils/rgbCode';

const initialChroma = 128;
const newChroma = 64;

let container, getByTestId, rerender;
beforeEach(() => {
  return ({container, getByTestId, rerender} = render(
    <ChromaPreview chroma={initialChroma.toString()} />,
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

test('sets the color by props.chroma', () => {
  expect(getByTestId('Purple')).toHaveAttribute(
    'fill',
    rgbCode(initialChroma).purple,
  );
  expect(getByTestId('Red')).toHaveAttribute(
    'fill',
    rgbCode(initialChroma).red,
  );
  expect(getByTestId('Yellow')).toHaveAttribute(
    'fill',
    rgbCode(initialChroma).yellow,
  );
  expect(getByTestId('Green')).toHaveAttribute(
    'fill',
    rgbCode(initialChroma).green,
  );
  expect(getByTestId('Cyan')).toHaveAttribute(
    'fill',
    rgbCode(initialChroma).cyan,
  );
  expect(getByTestId('Blue')).toHaveAttribute(
    'fill',
    rgbCode(initialChroma).blue,
  );

  rerender(<ChromaPreview chroma={newChroma.toString()} />);
  expect(getByTestId('Purple')).toHaveAttribute(
    'fill',
    rgbCode(newChroma).purple,
  );
  expect(getByTestId('Red')).toHaveAttribute('fill', rgbCode(newChroma).red);
  expect(getByTestId('Yellow')).toHaveAttribute(
    'fill',
    rgbCode(newChroma).yellow,
  );
  expect(getByTestId('Green')).toHaveAttribute(
    'fill',
    rgbCode(newChroma).green,
  );
  expect(getByTestId('Cyan')).toHaveAttribute('fill', rgbCode(newChroma).cyan);
  expect(getByTestId('Blue')).toHaveAttribute('fill', rgbCode(newChroma).blue);
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
            fill="rgb(200, 72, 200)"
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
            fill="rgb(251, 251, 123)"
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
            fill="rgb(109, 237, 109)"
            height="93"
            width="93"
            x="0"
            y="0"
          />
          <rect
            data-testid="Cyan"
            fill="rgb(114, 242, 242)"
            height="93"
            width="93"
            x="94"
            y="0"
          />
          <rect
            data-testid="Blue"
            fill="rgb(37, 37, 165)"
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
