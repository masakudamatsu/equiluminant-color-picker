import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import Sector from './Sector';

const mockColorCode = 'rgb(124, 234, 12)';

let container, getByTestId, rerender;
beforeEach(() => {
  return ({container, getByTestId, rerender} = render(
    <svg>
      <Sector
        angle={10}
        degToRotate={90}
        fillColorCode={mockColorCode}
        strokeColor="black"
      />
    </svg>,
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders correctly', () => {
  expect(container).toMatchInlineSnapshot(`
    <div>
      <svg>
        <path
          d="M250,250 l250,0 A250,250 0,0,0 496.201938253052,206.58795558326742 z"
          data-testid="sector"
          fill="rgb(124, 234, 12)"
          stroke="black"
          transform="rotate(-90, 250, 250)"
        />
      </svg>
    </div>
  `);
});

test('is accessible', async () => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  cleanup();
});

test('Removing the strokeColor prop renders Sector without stroke', () => {
  rerender(
    <svg>
      <Sector angle={10} degToRotate={90} fillColorCode={mockColorCode} />
    </svg>,
  );
  expect(getByTestId('sector')).toHaveAttribute('stroke', 'none');
});
